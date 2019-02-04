<?php

/**
* Copyright Maarch since 2008 under licence GPLv3.
* See LICENCE.txt file at the root folder for more details.
* This file is part of Maarch software.
*
*/

use PHPUnit\Framework\TestCase;

class SummarySheetControllerTest extends TestCase
{
    public function testCreateList()
    {
        $GLOBALS['userId'] = 'bbain';

        $summarySheetController = new \Resource\controllers\SummarySheetController();

        //  POST
        $environment    = \Slim\Http\Environment::mock(['REQUEST_METHOD' => 'POST']);
        $request        = \Slim\Http\Request::createFromEnvironment($environment);

        $aArgs = [
            "resources" => $GLOBALS['resources'],
            "units" => [
                ['label' => 'Informations', 'unit' => 'primaryInformations'],
                ['label' => 'Informations Secondaires', 'unit' => 'secondaryInformations'],
                ['label' => 'Liste de diffusion', 'unit' => 'diffusionList'],
                ['label' => 'Ptit avis les potos.', 'unit' => 'freeField'],
                ['label' => 'Annotation(s)', 'unit' => 'notes'],
                ['label' => 'Circuit de visa', 'unit' => 'visaWorkflow'],
                ['label' => 'Circuit d\'avis', 'unit' => 'opinionWorkflow'],
                ['label' => 'Commentaires', 'unit' => 'freeField']
            ],
        ];
        $fullRequest = \httpRequestCustom::addContentInBody($aArgs, $request);

        $response     = $summarySheetController->createList($fullRequest, new \Slim\Http\Response(), ['userId' => 19, 'groupId' => 2, 'basketId' => 10]);
        $responseBody = json_decode((string)$response->getBody());

        $this->assertSame(null, $responseBody);


        //ERRORS
        $environment    = \Slim\Http\Environment::mock(['REQUEST_METHOD' => 'POST']);
        $request        = \Slim\Http\Request::createFromEnvironment($environment);

        unset($aArgs['resources']);
        $fullRequest = \httpRequestCustom::addContentInBody($aArgs, $request);
        $response = $summarySheetController->createList($fullRequest, new \Slim\Http\Response(), ['userId' => 19, 'groupId' => 2, 'basketId' => 10]);
        $responseBody = json_decode((string)$response->getBody());
        $this->assertSame('Resources is not set or empty', $responseBody->errors);

        $GLOBALS['userId'] = 'superadmin';
    }
}
