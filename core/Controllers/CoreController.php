<?php

/**
 * Copyright Maarch since 2008 under licence GPLv3.
 * See LICENCE.txt file at the root folder for more details.
 * This file is part of Maarch software.
 *
 */

/**
 * @brief Core Controller
 * @author dev@maarch.org
 * @ingroup core
 */

namespace Core\Controllers;

use Psr\Http\Message\RequestInterface;
use Psr\Http\Message\ResponseInterface;
use Respect\Validation\Validator;
use Core\Models\ServiceModel;

include_once 'core/class/class_portal.php';

class CoreController
{
    public function initialize(RequestInterface $request, ResponseInterface $response)
    {
        $data = $request->getParams();

        $availableLanguages = ['en', 'fr'];

        $aInit = [];
        $aInit['lang'] = 'en';
        $aInit['coreUrl'] = str_replace('rest/', '', \Url::coreurl());
        $aInit['applicationName'] = $_SESSION['config']['applicationname']; //Todo No Session

        if (!empty($data['views'])) {
            foreach ($data['views'] as $view) {
                $aInit[$view . 'View'] = 'Views/' . $view . '.component.html';
                if(file_exists("{$_SESSION['config']['corepath']}custom/{$_SESSION['custom_override_id']}/apps/maarch_entreprise/Views/{$view}.component.html")) {
                    $aInit[$view . 'View'] = "../../custom/{$_SESSION['custom_override_id']}/apps/maarch_entreprise/Views/{$view}.component.html";
                }
            }
        }

        if (file_exists("custom/{$_SESSION['custom_override_id']}/apps/maarch_entreprise/xml/config.xml")) { //Todo No Session
            $path = "custom/{$_SESSION['custom_override_id']}/apps/maarch_entreprise/xml/config.xml";
        } else {
            $path = 'apps/maarch_entreprise/xml/config.xml';
        }

        if (file_exists($path)) {
            $loadedXml = simplexml_load_file($path);
            if ($loadedXml) {
                $lang = (string)$loadedXml->CONFIG->lang;
                if (in_array($lang, $availableLanguages)) {
                    $aInit['lang'] = $lang;
                }
            }
        }

        return $response->withJson($aInit);
    }

    public static function getAdministration(RequestInterface $request, ResponseInterface $response)
    {
        if ($_SESSION['user']['UserId'] == 'superadmin') {
            $administration = [];
            $administration['application'] = ServiceModel::getApplicationAdministrationServicesByXML();
            $administration['modules'] = ServiceModel::getModulesAdministrationServicesByXML();
        } else {
            $administration = ServiceModel::getAdministrationServicesByUserId(['userId' => $_SESSION['user']['UserId']]);
        }

        return $response->withJson($administration);
    }
}
