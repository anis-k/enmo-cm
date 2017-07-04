<?php

/**
* Copyright Maarch since 2008 under licence GPLv3.
* See LICENCE.txt file at the root folder for more details.
* This file is part of Maarch software.
*
*/
/**
* @brief Maarch rest root file
*
* @file
* @author dev@maarch.org
* @date $date$
* @version $Revision$
* @ingroup core
*/

require '../vendor/autoload.php';

header('Content-Type: text/html; charset=utf-8');

//create session if NO SESSION
if (empty($_SESSION['user'])) {
    require_once('../core/class/class_functions.php');
    include_once('../core/init.php');
    require_once('core/class/class_portal.php');
    require_once('core/class/class_db.php');
    require_once('core/class/class_request.php');
    require_once('core/class/class_core_tools.php');
    require_once('core/class/web_service/class_web_service.php');
    require_once('core/services/CoreConfig.php');

    //load Maarch session vars
    $portal = new portal();
    $portal->unset_session();
    $portal->build_config();
    $coreTools = new core_tools();
    $_SESSION['custom_override_id'] = $coreTools->get_custom_id();
    if (isset($_SESSION['custom_override_id'])
        && ! empty($_SESSION['custom_override_id'])
        && isset($_SESSION['config']['corepath'])
        && ! empty($_SESSION['config']['corepath'])
    ) {
        $path = $_SESSION['config']['corepath'] . 'custom' . DIRECTORY_SEPARATOR
            . $_SESSION['custom_override_id'] . DIRECTORY_SEPARATOR;
        set_include_path(
            $path . PATH_SEPARATOR . $_SESSION['config']['corepath']
            . PATH_SEPARATOR . get_include_path()
        );
    } elseif (isset($_SESSION['config']['corepath'])
        && ! empty($_SESSION['config']['corepath'])
    ) {
        set_include_path(
            $_SESSION['config']['corepath'] . PATH_SEPARATOR . get_include_path()
        );
    }
    // Load configuration from xml into session
    Core_CoreConfig_Service::buildCoreConfig('core' . DIRECTORY_SEPARATOR . 'xml' . DIRECTORY_SEPARATOR . 'config.xml');
    $_SESSION['config']['app_id'] = $_SESSION['businessapps'][0]['appid'];
    require_once 'apps/' .$_SESSION['businessapps'][0]['appid']. '/class/class_business_app_tools.php';

    Core_CoreConfig_Service::buildBusinessAppConfig();

    // Load Modules configuration from xml into session
    Core_CoreConfig_Service::loadModulesConfig($_SESSION['modules']);
    Core_CoreConfig_Service::loadAppServices();
    Core_CoreConfig_Service::loadModulesServices($_SESSION['modules']);
}

//login management
if (empty($_SESSION['user'])) {
    require_once('apps/maarch_entreprise/class/class_login.php');
    $loginObj = new login();
    $loginMethods = $loginObj->build_login_method();
    require_once('core/services/Session.php');
    $oSessionService = new \Core_Session_Service();

    $loginObj->execute_login_script($loginMethods, true);
}

if ($_SESSION['error']) {
    //TODO : return http bad authent error
    echo $_SESSION['error'];
    exit();
}

//$lifetime = 3600;
//setcookie(session_name(),session_id(),time()+$lifetime);

//exit;

$app = new \Slim\App([
    'settings' => [
        'displayErrorDetails' => true
    ]
]);

//Initialize
$app->post('/initialize', \Core\Controllers\CoreController::class . ':initialize');

//Administration
$app->get('/administration', \Core\Controllers\CoreController::class . ':getAdministration');
$app->get('/administration/users', \Core\Controllers\UserController::class . ':getUsersForAdministration');
$app->get('/administration/users/new', \Core\Controllers\UserController::class . ':getNewUserForAdministration');
$app->get('/administration/users/{id}', \Core\Controllers\UserController::class . ':getUserForAdministration');

//status
$app->get('/administration/status', \Core\Controllers\StatusController::class . ':getList');
$app->get('/status/new', \Core\Controllers\StatusController::class . ':getNewInformations');
$app->get('/status/{identifier}', \Core\Controllers\StatusController::class . ':getByIdentifier');
$app->post('/status', \Core\Controllers\StatusController::class . ':create');
$app->put('/status/{identifier}', \Core\Controllers\StatusController::class . ':update');
$app->delete('/status/{identifier}', \Core\Controllers\StatusController::class . ':delete');

//docserver
$app->get('/docserver', \Core\Controllers\DocserverController::class . ':getList');
$app->get('/docserver/{id}', \Core\Controllers\DocserverController::class . ':getById');

//docserverType
$app->get('/docserverType', \Core\Controllers\DocserverTypeController::class . ':getList');
$app->get('/docserverType/{id}', \Core\Controllers\DocserverTypeController::class . ':getById');

//attachments
$app->get('/attachments', \Attachments\Controllers\AttachmentsController::class . ':getList');
$app->get('/attachments/{id}', \Attachments\Controllers\AttachmentsController::class . ':getById');
$app->post('/attachments', \Attachments\Controllers\AttachmentsController::class . ':create');

//ListModels
$app->get('/listModels/itemId/{itemId}/itemMode/{itemMode}/objectType/{objectType}', \Entities\Controllers\ListModelsController::class . ':getListModelsDiffListDestByUserId');
$app->put('/listModels/itemId/{itemId}/itemMode/{itemMode}/objectType/{objectType}', \Entities\Controllers\ListModelsController::class . ':updateListModelsDiffListDestByUserId');

//Visa
$app->get('/{basketId}/signatureBook/resList', \Visa\Controllers\VisaController::class . ':getResList');
$app->get('/{basketId}/signatureBook/resList/details', \Visa\Controllers\VisaController::class . ':getDetailledResList');
$app->get('/{basketId}/signatureBook/{resId}', \Visa\Controllers\VisaController::class . ':getSignatureBook');
$app->get('/signatureBook/{resId}/attachments', \Visa\Controllers\VisaController::class . ':getAttachmentsById');
$app->get('/signatureBook/{resId}/incomingMailAttachments', \Visa\Controllers\VisaController::class . ':getIncomingMailAndAttachmentsById');
$app->put('/{collId}/{resId}/unsign', \Visa\Controllers\VisaController::class . ':unsignFile');

//resource
$app->post('/res', \Core\Controllers\ResController::class . ':create');
$app->put('/res', \Core\Controllers\ResController::class . ':update');
$app->get('/res/{resId}/lock', \Core\Controllers\ResController::class . ':isLock');
$app->get('/res/{resId}/notes/count', \Core\Controllers\ResController::class . ':getNotesCountForCurrentUserById');

//extresource
$app->post('/resExt', \Core\Controllers\ResExtController::class . ':create');

//Users
$app->get('/users/autocompleter', \Core\Controllers\UserController::class . ':getUsersForAutocompletion');
$app->get('/users/autocompleter/exclude/{userId}', \Core\Controllers\UserController::class . ':getUsersForAutocompletionWithExclusion');
$app->get('/users/profile', \Core\Controllers\UserController::class . ':getCurrentUserInfos');
$app->put('/users/profile', \Core\Controllers\UserController::class . ':updateProfile');
$app->post('/users', \Core\Controllers\UserController::class . ':create');
$app->put('/users/{userId}', \Core\Controllers\UserController::class . ':update');
$app->delete('/users/{userId}', \Core\Controllers\UserController::class . ':delete');
$app->post('/users/{userId}/groups', \Core\Controllers\UserController::class . ':addGroup');
$app->put('/users/{userId}/groups/{groupId}', \Core\Controllers\UserController::class . ':updateGroup');
$app->delete('/users/{userId}/groups/{groupId}', \Core\Controllers\UserController::class . ':deleteGroup');
$app->post('/users/{userId}/entities', \Core\Controllers\UserController::class . ':addEntity');
$app->put('/users/{userId}/entities/{entityId}', \Core\Controllers\UserController::class . ':updateEntity');
$app->put('/users/{userId}/entities/{entityId}/primaryEntity', \Core\Controllers\UserController::class . ':updatePrimaryEntity');
$app->delete('/users/{userId}/entities/{entityId}', \Core\Controllers\UserController::class . ':deleteEntity');
$app->put('/users/{userId}/password', \Core\Controllers\UserController::class . ':resetPassword');
$app->post('/users/{id}/signatures', \Core\Controllers\UserController::class . ':addSignature');
$app->put('/users/{id}/signatures/{signatureId}', \Core\Controllers\UserController::class . ':updateSignature');
$app->delete('/users/{id}/signatures/{signatureId}', \Core\Controllers\UserController::class . ':deleteSignature');
$app->post('/users/{userId}/baskets/absence', \Core\Controllers\UserController::class . ':setBasketsRedirectionForAbsence');

//CurrentUser
$app->put('/currentUser/password', \Core\Controllers\UserController::class . ':updateCurrentUserPassword');
$app->post('/currentUser/emailSignature', \Core\Controllers\UserController::class . ':createCurrentUserEmailSignature');
$app->put('/currentUser/emailSignature/{id}', \Core\Controllers\UserController::class . ':updateCurrentUserEmailSignature');
$app->delete('/currentUser/emailSignature/{id}', \Core\Controllers\UserController::class . ':deleteCurrentUserEmailSignature');

$app->run();
