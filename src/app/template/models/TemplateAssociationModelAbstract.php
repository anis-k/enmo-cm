<?php

/**
 * Copyright Maarch since 2008 under licence GPLv3.
 * See LICENCE.txt file at the root folder for more details.
 * This file is part of Maarch software.
 *
 */

/**
 * @brief Template Association Model Abstract
 * @author dev@maarch.org
 */

namespace Template\models;

use SrcCore\models\ValidatorModel;
use SrcCore\models\DatabaseModel;

abstract class TemplateAssociationModelAbstract
{
    public static function get(array $aArgs = [])
    {
        ValidatorModel::arrayType($aArgs, ['select', 'where', 'data', 'orderBy']);
        ValidatorModel::intType($aArgs, ['limit']);

        $aTemplates = DatabaseModel::select([
            'select'    => empty($aArgs['select']) ? ['*'] : $aArgs['select'],
            'table'     => ['templates_association'],
            'where'     => empty($aArgs['where']) ? [] : $aArgs['where'],
            'data'      => empty($aArgs['data']) ? [] : $aArgs['data'],
            'order_by'  => empty($aArgs['orderBy']) ? [] : $aArgs['orderBy'],
            'limit'     => empty($aArgs['limit']) ? 0 : $aArgs['limit']
        ]);

        return $aTemplates;
    }

//    public static function create(array $aArgs)
//    {
//        ValidatorModel::notEmpty($aArgs, ['template_label']);
//        ValidatorModel::stringType($aArgs, ['template_label']);
//
//        $nextSequenceId = DatabaseModel::getNextSequenceValue(['sequenceId' => 'templates_seq']);
//
//        DatabaseModel::insert(
//            [
//                'table'         => 'templates',
//                'columnsValues' => [
//                    'template_id'               => $nextSequenceId,
//                    'template_label'            => $aArgs['template_label'],
//                    'template_comment'          => $aArgs['template_comment'],
//                    'template_content'          => $aArgs['template_content'],
//                    'template_type'             => $aArgs['template_type'],
//                    'template_style'            => $aArgs['template_style'],
//                    'template_datasource'       => $aArgs['template_datasource'],
//                    'template_target'           => $aArgs['template_target'],
//                    'template_attachment_type'  => $aArgs['template_attachment_type'],
//                    'template_path'             => $aArgs['template_path'],
//                    'template_file_name'        => $aArgs['template_file_name'],
//                ]
//            ]
//        );
//
//        return $nextSequenceId;
//    }

    public static function update(array $aArgs)
    {
        ValidatorModel::notEmpty($aArgs, ['set', 'where', 'data']);
        ValidatorModel::arrayType($aArgs, ['set', 'where', 'data']);

        DatabaseModel::update([
            'table' => 'templates_association',
            'set'   => $aArgs['set'],
            'where' => $aArgs['where'],
            'data'  => $aArgs['data']
        ]);

        return true;
    }
}
