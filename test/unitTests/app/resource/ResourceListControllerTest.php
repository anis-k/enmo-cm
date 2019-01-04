<?php

/**
* Copyright Maarch since 2008 under licence GPLv3.
* See LICENCE.txt file at the root folder for more details.
* This file is part of Maarch software.
*
*/

use PHPUnit\Framework\TestCase;

class ResourceListControllerTest extends TestCase
{
    public function testGet()
    {
        $GLOBALS['userId'] = 'bbain';

        $resListController = new \Resource\controllers\ResourceListController();

        //  GET
        $environment    = \Slim\Http\Environment::mock(['REQUEST_METHOD' => 'GET']);
        $request        = \Slim\Http\Request::createFromEnvironment($environment);

        $aArgs = [
        ];
        $fullRequest = $request->withQueryParams($aArgs);

        $response     = $resListController->get($fullRequest, new \Slim\Http\Response(), ['userId' => 19, 'groupId' => 2, 'basketId' => 'MyBasket']);
        $responseBody = json_decode((string)$response->getBody());

        $this->assertInternalType('int', $responseBody->count);
        $this->assertNotNull($responseBody->basketLabel);

        //  GET
        $environment    = \Slim\Http\Environment::mock(['REQUEST_METHOD' => 'GET']);
        $request        = \Slim\Http\Request::createFromEnvironment($environment);

        $aArgs = [
            'limit'  => 2,
            'offset' => 2,
            'order'  => 'creation_date DESC'
        ];
        $fullRequest = $request->withQueryParams($aArgs);

        $response     = $resListController->get($fullRequest, new \Slim\Http\Response(), ['userId' => 19, 'groupId' => 2, 'basketId' => 'MyBasket']);
        $responseBody = json_decode((string)$response->getBody());

        $this->assertSame(2, count($responseBody->resources));

        //  GET
        $environment    = \Slim\Http\Environment::mock(['REQUEST_METHOD' => 'GET']);
        $request        = \Slim\Http\Request::createFromEnvironment($environment);
    
        $aArgs = [
                'order'            => 'priority DESC',
                'search'           => '2 Breaking News',
                'priorities'       => 'poiuytre1379nbvc,poiuytre1391nbvc',
                'categories'       => 'incoming',
                'statuses'         => 'COU',
                'entitiesChildren' => 'PJS'
            ];
        $fullRequest = $request->withQueryParams($aArgs);
    
        $response     = $resListController->get($fullRequest, new \Slim\Http\Response(), ['userId' => 19, 'groupId' => 2, 'basketId' => 'MyBasket']);
        $responseBody = json_decode((string)$response->getBody());
    
        $this->assertGreaterThanOrEqual(1, count($responseBody->resources));
        $this->assertNotNull($responseBody->resources[0]->creation_date);
        $this->assertSame('Demande de documents', $responseBody->resources[0]->doctype_label);
        $this->assertSame('Pôle Jeunesse et Sport', $responseBody->resources[0]->entity_destination);
        $this->assertNotNull($responseBody->resources[0]->priority_color);
        $this->assertNotNull($responseBody->resources[0]->priority_label);
        $this->assertNotNull($responseBody->resources[0]->status_icon);
        $this->assertNotNull($responseBody->resources[0]->status_label);
        $this->assertInternalType('int', $responseBody->resources[0]->res_id);
        $this->assertSame('incoming', $responseBody->resources[0]->category_id);
        $this->assertSame('COU', $responseBody->resources[0]->status_id);
        $this->assertSame('2 Breaking News : 12345 Superman is alive - PHP unit', $responseBody->resources[0]->subject);

        //  GET
        $environment    = \Slim\Http\Environment::mock(['REQUEST_METHOD' => 'GET']);
        $request        = \Slim\Http\Request::createFromEnvironment($environment);
    
        $aArgs = [
                'order'            => 'alt_identifier ASC',
                'search'           => '2 Breaking News',
                'priorities'       => 'poiuytre1379nbvc,poiuytre1391nbvc',
                'categories'       => 'incoming',
                'statuses'         => 'COU',
                'entities'         => 'PJS'
            ];
        $fullRequest = $request->withQueryParams($aArgs);
    
        $response     = $resListController->get($fullRequest, new \Slim\Http\Response(), ['userId' => 19, 'groupId' => 2, 'basketId' => 'MyBasket']);
        $responseBody = json_decode((string)$response->getBody());
    
        $this->assertGreaterThanOrEqual(1, count($responseBody->resources));

        //  ERRORS
        $response     = $resListController->get($request, new \Slim\Http\Response(), ['userId' => 19, 'groupId' => 777, 'basketId' => 'MyBasket']);
        $responseBody = json_decode((string)$response->getBody());
        $this->assertSame('Group or basket does not exist', $responseBody->errors);

        $response     = $resListController->get($request, new \Slim\Http\Response(), ['userId' => 19, 'groupId' => 2, 'basketId' => 'basketNoExist777']);
        $responseBody = json_decode((string)$response->getBody());
        $this->assertSame('Group or basket does not exist', $responseBody->errors);

        $response     = $resListController->get($request, new \Slim\Http\Response(), ['userId' => 777, 'groupId' => 2, 'basketId' => 'MyBasket']);
        $responseBody = json_decode((string)$response->getBody());
        $this->assertSame('Basket out of perimeter', $responseBody->errors);

        $GLOBALS['userId'] = 'superadmin';
    }

    public function testGetFilters()
    {
        $GLOBALS['userId'] = 'bbain';
        $resListController = new \Resource\controllers\ResourceListController();

        //  GET
        $environment    = \Slim\Http\Environment::mock(['REQUEST_METHOD' => 'GET']);
        $request        = \Slim\Http\Request::createFromEnvironment($environment);

        $aArgs = [
        ];
        $fullRequest = $request->withQueryParams($aArgs);

        $response     = $resListController->getFilters($fullRequest, new \Slim\Http\Response(), ['userId' => 19, 'groupId' => 2, 'basketId' => 'MyBasket']);
        $responseBody = json_decode((string)$response->getBody());

        $this->assertInternalType('array', $responseBody->entities);
        $this->assertInternalType('array', $responseBody->priorities);
        $this->assertInternalType('array', $responseBody->categories);
        $this->assertInternalType('array', $responseBody->statuses);
        $this->assertInternalType('array', $responseBody->entitiesChildren);

        //  GET
        $environment    = \Slim\Http\Environment::mock(['REQUEST_METHOD' => 'GET']);
        $request        = \Slim\Http\Request::createFromEnvironment($environment);

        $aArgs = [
            'search'   => 'Breaking News',
            'statuses' => 'NEW,COU'
        ];
        $fullRequest = $request->withQueryParams($aArgs);

        $response     = $resListController->getFilters($fullRequest, new \Slim\Http\Response(), ['userId' => 19, 'groupId' => 2, 'basketId' => 'MyBasket']);
        $responseBody = json_decode((string)$response->getBody());

        $this->assertGreaterThanOrEqual(2, count($responseBody->priorities));
        $this->assertGreaterThanOrEqual(3, count($responseBody->statuses));

        foreach ([$responseBody->priorities, $responseBody->statuses] as $response) {
            foreach ($response as $value) {
                $this->assertNotNull($value->id);
                $this->assertNotNull($value->label);
                $this->assertInternalType('int', $value->count);
            }
        }

        //  GET
        $environment    = \Slim\Http\Environment::mock(['REQUEST_METHOD' => 'GET']);
        $request        = \Slim\Http\Request::createFromEnvironment($environment);

        $aArgs = [
            'priorities'       => 'poiuytre1379nbvc,poiuytre1391nbvc',
            'categories'       => 'incoming',
            'entitiesChildren' => 'PJS'
        ];
        $fullRequest = $request->withQueryParams($aArgs);

        $response     = $resListController->getFilters($fullRequest, new \Slim\Http\Response(), ['userId' => 19, 'groupId' => 2, 'basketId' => 'MyBasket']);
        $responseBody = json_decode((string)$response->getBody());

        $this->assertInternalType('array', $responseBody->entities);
        $this->assertInternalType('array', $responseBody->priorities);
        $this->assertInternalType('array', $responseBody->categories);
        $this->assertInternalType('array', $responseBody->statuses);
        $this->assertInternalType('array', $responseBody->entitiesChildren);

        $GLOBALS['userId'] = 'superadmin';
    }
}
