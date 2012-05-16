<?php
/*
*   Copyright 2008-2012 Maarch
*
*   This file is part of Maarch Framework.
*
*   Maarch Framework is free software: you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation, either version 3 of the License, or
*   (at your option) any later version.
*
*   Maarch Framework is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*   GNU General Public License for more details.
*
*   You should have received a copy of the GNU General Public License
*   along with Maarch Framework. If not, see <http://www.gnu.org/licenses/>.
*/

/**
* @brief class of install tools
*
* @file
* @author Arnaud Veber
* @date $date$
* @version $Revision$
* @ingroup install
*/

//CONTROLLER

    //TITLE
        $shortTitle = _LICENCE . ' GPL v3';
        $longTitle = _LICENCE . ' GPL v3';

    //LICENCE FILE
        $pathToLicenceTxt = 'install/view/text/licence_'.$Class_Install->getActualLang().'.txt';
        if (!file_exists($pathToLicenceTxt)) {
            $pathToLicenceTxt = 'install/view/text/licence_en.txt';
        }

        $fileLicence = file($pathToLicenceTxt);
        $txtLicence = '';
        for ($i=0;$i<count($fileLicence);$i++) {
            $txtLicence .= str_replace(array('<', '>'), array('&lt;', '&gt;'),$fileLicence[$i]).'<br />';
        }

    //PROGRESS
        $stepNb = 3;
        $stepNbTotal = 8;

//VIEW
    $view = 'licence';
