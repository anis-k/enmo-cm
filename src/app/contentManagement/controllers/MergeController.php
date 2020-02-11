<?php

/**
 * Copyright Maarch since 2008 under licence GPLv3.
 * See LICENCE.txt file at the root folder for more details.
 * This file is part of Maarch software.
 */

/**
 * @brief Merge Controller
 *
 * @author dev@maarch.org
 */

namespace ContentManagement\controllers;

use Contact\controllers\ContactController;
use Contact\models\ContactModel;
use Doctype\models\DoctypeModel;
use Entity\models\EntityModel;
use Entity\models\ListInstanceModel;
use IndexingModel\models\IndexingModelModel;
use Note\models\NoteModel;
use Resource\models\ResModel;
use Resource\models\ResourceContactModel;
use SrcCore\models\TextFormatModel;
use SrcCore\models\ValidatorModel;
use User\models\UserModel;

include_once('vendor/tinybutstrong/opentbs/tbs_plugin_opentbs.php');


class MergeController
{
    const OFFICE_EXTENSIONS = ['odt', 'ods', 'odp', 'xlsx', 'pptx', 'docx', 'odf'];

    public static function mergeDocument(array $args)
    {
        ValidatorModel::notEmpty($args, ['data']);
        ValidatorModel::arrayType($args, ['data']);
        ValidatorModel::stringType($args, ['path', 'content']);
        ValidatorModel::notEmpty($args['data'], ['userId']);
        ValidatorModel::intVal($args['data'], ['userId']);

        setlocale(LC_TIME, _DATE_LOCALE);

        $tbs = new \clsTinyButStrong();
        $tbs->NoErr = true;
        $tbs->Protect = false;

        if (!empty($args['path'])) {
            $pathInfo = pathinfo($args['path']);
            $extension = $pathInfo['extension'];
        } else {
            $tbs->Source = $args['content'];
            $extension = 'unknow';
            $args['path'] = null;
        }

        if (strtolower($extension) != 'html') {
            $tbs->PlugIn(TBS_INSTALL, OPENTBS_PLUGIN);
        }

        $dataToBeMerge = MergeController::getDataForMerge($args['data']);

        if (!empty($args['path'])) {
            if ($extension == 'odt') {
                $tbs->LoadTemplate($args['path'], OPENTBS_ALREADY_UTF8);
            //  $tbs->LoadTemplate("{$args['path']}#content.xml;styles.xml", OPENTBS_ALREADY_UTF8);
            } elseif ($extension == 'docx') {
                foreach (['recipient', 'sender', 'attachmentRecipient'] as $contact) {
                    if (!empty($dataToBeMerge[$contact]['postal_address'])) {
                        $dataToBeMerge[$contact]['postal_address'] = nl2br($dataToBeMerge[$contact]['postal_address']);
                        $dataToBeMerge[$contact]['postal_address'] = str_replace('<br />', '</w:t><w:br/><w:t>', $dataToBeMerge[$contact]['postal_address']);
                        $dataToBeMerge[$contact]['postal_address'] = str_replace(["\n\r", "\r\n", "\r", "\n"], "", $dataToBeMerge[$contact]['postal_address']);
                    }
                }
                $tbs->LoadTemplate($args['path'], OPENTBS_ALREADY_UTF8);
                $templates = ['word/header1.xml', 'word/header2.xml', 'word/header3.xml', 'word/footer1.xml', 'word/footer2.xml', 'word/footer3.xml'];
                foreach ($templates as $template) {
                    if ($tbs->Plugin(OPENTBS_FILEEXISTS, $template)) {
                        $tbs->LoadTemplate("#{$template}", OPENTBS_ALREADY_UTF8);
                        foreach ($dataToBeMerge as $key => $value) {
                            $tbs->MergeField($key, $value);
                        }
                    }
                }
                $tbs->PlugIn(OPENTBS_SELECT_MAIN);
            } else {
                $tbs->LoadTemplate($args['path'], OPENTBS_ALREADY_UTF8);
            }
        }

        $pages = 1;
        if ($extension == 'xlsx') {
            $pages = $tbs->PlugIn(OPENTBS_COUNT_SHEETS);
        }

        for ($i = 0; $i < $pages; ++$i) {
            if ($extension == 'xlsx') {
                $tbs->PlugIn(OPENTBS_SELECT_SHEET, $i + 1);
            }
            foreach ($dataToBeMerge as $key => $value) {
                $tbs->MergeField($key, $value);
            }
        }

        if (in_array($extension, MergeController::OFFICE_EXTENSIONS)) {
            $tbs->Show(OPENTBS_STRING);
        } else {
            $tbs->Show(TBS_NOTHING);
        }

        return ['encodedDocument' => base64_encode($tbs->Source)];
    }

    private static function getDataForMerge(array $args)
    {
        ValidatorModel::notEmpty($args, ['userId']);
        ValidatorModel::intVal($args, ['resId', 'userId']);

        //Resource
        if (!empty($args['resId'])) {
            $resource = ResModel::getById(['select' => ['*'], 'resId' => $args['resId']]);

            if (!empty($args['senderId']) && !empty($args['senderType'])) {
                $senders = [['id' => $args['senderId'], 'type' => $args['senderType']]];
            } else {
                $senders = ResourceContactModel::get(['select' => ['item_id as id', 'type'], 'where' => ['res_id = ?', 'mode = ?'], 'data' => [$args['resId'], 'sender'], 'limit' => 1]);
            }

            if (!empty($args['recipientId']) && !empty($args['recipientType'])) {
                $recipients = [['id' => $args['recipientId'], 'type' => $args['recipientType']]];
            } else {
                $recipients = ResourceContactModel::get(['select' => ['item_id as id', 'type'], 'where' => ['res_id = ?', 'mode = ?'], 'data' => [$args['resId'], 'recipient'], 'limit' => 1]);
            }
        } else {
            if (!empty($args['modelId'])) {
                $indexingModel = IndexingModelModel::getById(['id' => $args['modelId'], 'select' => ['category']]);
            }
            if (!empty($args['initiator'])) {
                $entity = EntityModel::getById(['id' => $args['initiator'], 'select' => ['entity_id']]);
                $args['initiator'] = $entity['entity_id'];
            }
            if (!empty($args['destination'])) {
                $entity = EntityModel::getById(['id' => $args['destination'], 'select' => ['entity_id']]);
                $args['destination'] = $entity['entity_id'];
            }
            $resource = [
                'model_id'              => $args['modelId'] ?? null,
                'alt_identifier'        => '[res_letterbox.alt_identifier]',
                'category_id'           => $indexingModel['category'] ?? null,
                'type_id'               => $args['doctype'] ?? null,
                'subject'               => $args['subject'] ?? null,
                'destination'           => $args['destination'] ?? null,
                'initiator'             => $args['initiator'] ?? null,
                'doc_date'              => $args['documentDate'] ?? null,
                'admission_date'        => $args['arrivalDate'] ?? null,
                'departure_date'        => $args['departureDate'] ?? null,
                'process_limit_date'    => $args['processLimitDate'] ?? null,
                'barcode'               => $args['barcode'] ?? null,
                'origin'                => $args['origin'] ?? null
            ];
            $senders = $args['senders'];
            $recipients = $args['recipients'];
        }
        $allDates = ['doc_date', 'departure_date', 'admission_date', 'process_limit_date', 'opinion_limit_date', 'closing_date', 'creation_date'];
        foreach ($allDates as $date) {
            $resource[$date] = TextFormatModel::formatDate($resource[$date], 'd/m/Y');
        }
        $resource['category_id'] = ResModel::getCategoryLabel(['categoryId' => $resource['category_id']]);

        if (!empty($resource['type_id'])) {
            $doctype = DoctypeModel::getById(['id' => $resource['type_id'], 'select' => ['process_delay', 'process_mode', 'description']]);
            $resource['type_label'] = $doctype['description'];
            $resource['process_delay'] = $doctype['process_delay'];
            $resource['process_mode'] = $doctype['process_mode'];
        }

        if (!empty($resource['initiator'])) {
            $initiator = EntityModel::getByEntityId(['entityId' => $resource['initiator'], 'select' => ['*']]);
            $initiator['path'] = EntityModel::getEntityPathByEntityId(['entityId' => $resource['initiator'], 'path' => '']);
            if (!empty($initiator['parent_entity_id'])) {
                $parentInitiator = EntityModel::getByEntityId(['entityId' => $initiator['parent_entity_id'], 'select' => ['*']]);
            }
        }
        if (!empty($resource['destination'])) {
            $destination = EntityModel::getByEntityId(['entityId' => $resource['destination'], 'select' => ['*']]);
            $destination['path'] = EntityModel::getEntityPathByEntityId(['entityId' => $resource['destination'], 'path' => '']);
            if (!empty($destination['parent_entity_id'])) {
                $parentDestination = EntityModel::getByEntityId(['entityId' => $destination['parent_entity_id'], 'select' => ['*']]);
            }
        }

        //Attachment
        $attachment = [
            'chrono'    => '[attachment.chrono]',
            'title'     => $args['attachment_title'] ?? null
        ];
        $attachmentRecipient = MergeController::formatPerson(['id' => $args['recipientId'], 'type' => $args['recipientType']]);

        //Sender
        $sender = MergeController::formatPerson(['id' => $senders[0]['id'], 'type' => $senders[0]['type']]);
        //Recipient
        $recipient = MergeController::formatPerson(['id' => $recipients[0]['id'], 'type' => $recipients[0]['type']]);

        //User
        $currentUser = UserModel::getById(['id' => $args['userId'], 'select' => ['firstname', 'lastname', 'phone', 'mail', 'initials']]);
        $currentUserPrimaryEntity = UserModel::getPrimaryEntityById(['id' => $args['userId'], 'select' => ['entities.*', 'users_entities.user_role as role']]);
        if (!empty($currentUserPrimaryEntity)) {
            $currentUserPrimaryEntity['path'] = EntityModel::getEntityPathByEntityId(['entityId' => $currentUserPrimaryEntity['entity_id'], 'path' => '']);
        }

        //Visas
        $visas = '';
        if (!empty($args['resId'])) {
            $visaWorkflow = ListInstanceModel::get([
                'select'    => ['item_id'],
                'where'     => ['difflist_type = ?', 'res_id = ?'],
                'data'      => ['VISA_CIRCUIT', $args['resId']],
                'orderBy'   => ['listinstance_id']
            ]);
            foreach ($visaWorkflow as $value) {
                $labelledUser = UserModel::getLabelledUserById(['login' => $value['item_id']]);
                $primaryentity = UserModel::getPrimaryEntityByUserId(['userId' => $value['item_id']]);
                $visas .= "{$labelledUser} ({$primaryentity})\n";
            }
        }

        //Opinions
        $opinions = '';
        if (!empty($args['resId'])) {
            $opinionWorkflow = ListInstanceModel::get([
                'select'    => ['item_id'],
                'where'     => ['difflist_type = ?', 'res_id = ?'],
                'data'      => ['AVIS_CIRCUIT', $args['resId']],
                'orderBy'   => ['listinstance_id']
            ]);
            foreach ($opinionWorkflow as $value) {
                $labelledUser = UserModel::getLabelledUserById(['login' => $value['item_id']]);
                $primaryentity = UserModel::getPrimaryEntityByUserId(['userId' => $value['item_id']]);
                $opinions .= "{$labelledUser} ({$primaryentity})\n";
            }
        }

        //Copies
        $copies = '';
        if (!empty($args['resId'])) {
            $copyWorkflow = ListInstanceModel::get([
                'select'    => ['item_id', 'item_type'],
                'where'     => ['difflist_type = ?', 'res_id = ?', 'item_mode = ?'],
                'data'      => ['entity_id', $args['resId'], 'cc'],
                'orderBy'   => ['listinstance_id']
            ]);
            foreach ($copyWorkflow as $value) {
                if ($value['item_type'] == 'user_id') {
                    $labelledUser  = UserModel::getLabelledUserById(['login' => $value['item_id']]);
                    $primaryentity = UserModel::getPrimaryEntityByUserId(['userId' => $value['item_id']]);
                    $label         = "{$labelledUser} ({$primaryentity})";
                } else {
                    $entity = EntityModel::getByEntityId(['entityId' => $value['item_id'], 'select' => ['entity_label']]);
                    $label = $entity['entity_label'];
                }
                $copies .= "{$label}\n";
            }
        }

        //Notes
        $mergedNote = '';
        if (!empty($args['resId'])) {
            $notes = NoteModel::getByUserIdForResource(['select' => ['note_text', 'creation_date', 'user_id'], 'resId' => $args['resId'], 'userId' => $args['userId']]);
            foreach ($notes as $note) {
                $labelledUser = UserModel::getLabelledUserById(['id' => $note['user_id']]);
                $creationDate = TextFormatModel::formatDate($note['creation_date'], 'd/m/Y');
                $mergedNote .= "{$labelledUser} : {$creationDate} : {$note['note_text']}\n";
            }
        }

        //CustomFields
        if (!empty($args['resId'])) {
            $customs = !empty($resource['custom_fields']) ? json_decode($resource['custom_fields'], true) : [];
            foreach ($customs as $customId => $custom) {
                if (is_array($custom)) {
                    if (is_array($custom[0])) { //Custom BAN
                        $resource['customField_' . $customId] = "{$custom[0]['addressNumber']} {$custom[0]['addressStreet']} {$custom[0]['addressTown']} ({$custom[0]['addressPostcode']})";
                    } else {
                        $resource['customField_' . $customId] = implode("\n", $custom);
                    }
                } else {
                    $resource['customField_' . $customId] = $custom;
                }
            }
        } else {
            if (!empty($args['customFields'])) {
                foreach ($args['customFields'] as $key => $customField) {
                    if (is_array($customField)) {
                        if (is_array($customField[0])) { //Custom BAN
                            $resource['customField_' . $key] = "{$customField[0]['addressNumber']} {$customField[0]['addressStreet']} {$customField[0]['addressTown']} ({$customField[0]['addressPostcode']})";
                        } else {
                            $resource['customField_' . $key] = implode("\n", $customField);
                        }
                    } else {
                        $resource['customField_' . $key] = $customField;
                    }
                }
            }
        }

        //Datetime
        $datetime = [
            'date'  => date('d-m-Y'),
            'time'  => date('H:i')
        ];

        $dataToBeMerge['res_letterbox']         = $resource;
        $dataToBeMerge['initiator']             = empty($initiator) ? [] : $initiator;
        $dataToBeMerge['parentInitiator']       = empty($parentInitiator) ? [] : $parentInitiator;
        $dataToBeMerge['destination']           = empty($destination) ? [] : $destination;
        $dataToBeMerge['parentDestination']     = empty($parentDestination) ? [] : $parentDestination;
        $dataToBeMerge['attachment']            = $attachment;
        $dataToBeMerge['sender']                = $sender;
        $dataToBeMerge['recipient']             = $recipient;
        $dataToBeMerge['user']                  = $currentUser;
        $dataToBeMerge['userPrimaryEntity']     = $currentUserPrimaryEntity;
        $dataToBeMerge['visas']                 = $visas;
        $dataToBeMerge['opinions']              = $opinions;
        $dataToBeMerge['copies']                = $copies;
        $dataToBeMerge['contact']               = [];
        $dataToBeMerge['notes']                 = $mergedNote;
        $dataToBeMerge['datetime']              = $datetime;
        if (empty($args['inMailing'])) {
            $dataToBeMerge['attachmentRecipient']   = $attachmentRecipient;
        }

        return $dataToBeMerge;
    }

    public static function mergeChronoDocument(array $args)
    {
        ValidatorModel::stringType($args, ['path', 'content', 'chrono']);

        $tbs = new \clsTinyButStrong();
        $tbs->NoErr = true;
        $tbs->PlugIn(TBS_INSTALL, OPENTBS_PLUGIN);

        if (!empty($args['path'])) {
            $pathInfo = pathinfo($args['path']);
            $extension = $pathInfo['extension'];
        } else {
            $tbs->Source = $args['content'];
            $extension = 'unknow';
            $args['path'] = null;
        }

        if (!empty($args['path'])) {
            if ($extension == 'odt') {
                $tbs->LoadTemplate($args['path'], OPENTBS_ALREADY_UTF8);
            //            $tbs->LoadTemplate("{$args['path']}#content.xml;styles.xml", OPENTBS_ALREADY_UTF8);
            } elseif ($extension == 'docx') {
                $tbs->LoadTemplate($args['path'], OPENTBS_ALREADY_UTF8);
            //            $tbs->LoadTemplate("{$args['path']}#word/header1.xml;word/footer1.xml", OPENTBS_ALREADY_UTF8);
            } else {
                $tbs->LoadTemplate($args['path'], OPENTBS_ALREADY_UTF8);
            }
        }

        $tbs->MergeField('res_letterbox', ['alt_identifier' => $args['chrono']]);
        $tbs->MergeField('attachment', ['chrono' => $args['chrono']]);

        if (in_array($extension, MergeController::OFFICE_EXTENSIONS)) {
            $tbs->Show(OPENTBS_STRING);
        } else {
            $tbs->Show(TBS_NOTHING);
        }

        return ['encodedDocument' => base64_encode($tbs->Source)];
    }

    private static function formatPerson(array $args)
    {
        $person = [];

        if (!empty($args['id']) && !empty($args['type'])) {
            if ($args['type'] == 'contact') {
                $person = ContactModel::getById([
                    'id' => $args['id'],
                    'select' => [
                        'civility', 'firstname', 'lastname', 'company', 'department', 'function', 'address_number', 'address_street', 'address_town',
                        'address_additional1', 'address_additional2', 'address_postcode', 'address_town', 'address_country', 'phone', 'email', 'custom_fields'
                    ]
                ]);
                $postalAddress = ContactController::getContactAfnor($person);
                unset($postalAddress[0]);
                $person['postal_address'] = implode("\n", $postalAddress);
                $person['civility'] = ContactModel::getCivilityLabel(['civilityId' => $person['civility']]);
                $customFields = json_decode($person['custom_fields'], true);
                unset($person['custom_fields']);
                if (!empty($customFields)) {
                    foreach ($customFields as $key => $customField) {
                        $person["customField_{$key}"] = is_array($customField) ?  implode("\n", $customField) : $customField;
                    }
                }
            } elseif ($args['type'] == 'user') {
                $person = UserModel::getById(['id' => $args['id'], 'select' => ['firstname', 'lastname']]);
            } elseif ($args['type'] == 'entity') {
                $person = EntityModel::getById(['id' => $args['id'], 'select' => ['entity_label as lastname']]);
            }
        }

        return $person;
    }
}
