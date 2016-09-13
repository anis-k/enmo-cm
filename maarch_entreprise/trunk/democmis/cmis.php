<?php
//echo 'ici' . $_SESSION['config']['coreurl'];
//print_r($_SESSION['config']);
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" lang="fr"><head>
  <title>Démo CMIS</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta http-equiv="Content-Language" content="fr">
  <link rel="stylesheet" type="text/css" href="cmis_stylesheet.css" media="screen">
  </head>
  <body>
    <div>
      <div align="center">
        <h3>Accès Maarch via CMIS</h3>
      </div>
      <div>
        <p>
          </p><h4>Voir un document (id = 101)</h4>
          <!--div id="liencmis">
            <a href="<?php echo $_SESSION['config']['coreurl'];?>core/class/web_service/cmis_test/test_rest.php?collection=letterbox_coll&resource=res&amp;idResource=101" target="_blank">
              <?php echo $_SESSION['config']['coreurl'];?>core/class/web_service/cmis_test/test_rest.php?collection=letterbox_collresource=res&amp;idResource=101
            </a>
          </div-->
          <div id="liencmis">
            <a href="<?php echo $_SESSION['config']['coreurl'];?>ws_server.php?cmis/letterbox_coll/res/101" target="_blank">
              <?php echo $_SESSION['config']['coreurl'];?>ws_server.php?cmis/letterbox_coll/res/101
            </a>
          </div>
          <!--curl -X GET -ubblier:maarch "http://127.0.0.1/syleam_trunk/ws_server.php?REST/res/101"-->
        <p></p>
        <form method="post" action="<?php echo $_SESSION['config']['coreurl'];?>core/class/web_service/cmis_test/test_rest.php?resource=folder" target="_blank">
          <p>
            </p><h4>Créer un dossier</h4>
            <div id="liencmis">
              <input name="xmlFile" value="testcreatefolder.atom.xml" type="hidden">
              Fichier : TEST
              <br>
              <input class="button" name="submit" value="Créer" type="submit">
            </div>
            <!--curl -X POST -ubblier:maarch "<?php echo $_SESSION['config']['coreurl'];?>ws_server.php?REST/folder" -d atomFileContent=thexmlcontentfile-->
          <p></p>
        </form>
        <p>
          </p><h4>Consulter un dossier (id = TEST)</h4>
          <div id="liencmis">
            <a href="<?php echo $_SESSION['config']['coreurl'];?>core/class/web_service/cmis_test/test_rest.php?resource=folder&amp;idResource=TEST" target="_blank">
              <?php echo $_SESSION['config']['coreurl'];?>core/class/web_service/cmis_test/test_rest.php?resource=folder&amp;idResource=TEST
              </a>
          </div>
          <br />
          <div id="liencmis">
            <a href="<?php echo $_SESSION['config']['coreurl'];?>core/class/web_service/cmis_test/test_rest.php?resource=folder&amp;idResource=SF_0101" target="_blank">
              <?php echo $_SESSION['config']['coreurl'];?>core/class/web_service/cmis_test/test_rest.php?resource=folder&amp;idResource=SF_0101
              </a>
          </div>
          <!--curl -X GET -ubblier:maarch "<?php echo $_SESSION['config']['coreurl'];?>ws_server.php?REST/folder/RH"-->
        <p></p>
        <p>
          </p><h4>Voir la liste des corbeilles</h4>
          <div id="liencmis"> 
            <a href="<?php echo $_SESSION['config']['coreurl'];?>core/class/web_service/cmis_test/test_rest.php?resource=basket" target="_blank">
              <?php echo $_SESSION['config']['coreurl'];?>core/class/web_service/cmis_test/test_rest.php?resource=basket
            </a>
          </div>
          <!--curl -X GET -ubblier:maarch "<?php echo $_SESSION['config']['coreurl'];?>ws_server.php?REST/basket"-->
        <p></p>
        <p>
          </p><h4>Liste des documents d'une corbeille</h4>
          <div id="liencmis">
            <a href="<?php echo $_SESSION['config']['coreurl'];?>core/class/web_service/cmis_test/test_rest.php?resource=basket&amp;idResource=MyBasket" target="_blank">
              <?php echo $_SESSION['config']['coreurl'];?>core/class/web_service/cmis_test/test_rest.php?resource=basket&amp;idResource=MyBasket
            </a>
          </div>
          <br />
          <div id="liencmis">
            <a href="<?php echo $_SESSION['config']['coreurl'];?>core/class/web_service/cmis_test/test_rest.php?resource=basket&amp;idResource=APA_picking" target="_blank">
              <?php echo $_SESSION['config']['coreurl'];?>core/class/web_service/cmis_test/test_rest.php?resource=basket&amp;idResource=APA_picking
            </a>
          </div>
          <!--curl -X GET -ubblier:maarch "<?php echo $_SESSION['config']['coreurl'];?>ws_server.php?REST/basket/MesCourriersATraiter"-->
        <p></p>
        <form method="post" action="<?php echo $_SESSION['config']['coreurl'];?>core/class/web_service/cmis_test/test_rest.php?resource=res" target="_blank">
          <p>
            </p><h4>Recherche avancée de documents</h4>
            <div id="liencmis">
              <input name="xmlFile" value="query.xml" type="hidden">
              <!--curl -X POST -ubblier:maarch "<?php echo $_SESSION['config']['coreurl'];?>ws_server.php?REST/res" -d atomFileContent=thexmlcontentfile-->
              Requête : SELECT  cmis:objectId , maarch:type , maarch:entity , maarch:dest_user   FROM cmis:document  ORDER BY cmis:objectId asc 
              <br>
              <input class="button" name="submit" value="Rechercher" type="submit">
            </div>            
          <p></p>
        </form>
      </div>
    </div>
  </body>
</html>
