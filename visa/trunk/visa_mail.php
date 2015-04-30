<?php

/**
* @brief   Action : Viser le courrier
*
* Ouverture, dans une fenêtre séparée en deux, d'un document entrant (+ ses informations) d'une part
* et de ses projets de réponses d'autre part. Possibilité de modifier les réponses, écrire des notes 
* et envoyer des mails rapidement
*
* @file visa_mail
* @author Nicolas Couture <couture@docimsol.com>
* @date $date$
* @version $Revision$
* @ingroup apps
*/

/**
* $confirm  bool false
*/
$confirm = false;
/**
* $etapes  array Contains only one etap : form
*/
$etapes = array('form');
/**
* $frm_width  Width of the modal (empty)
*/
$frm_width='';
/**
* $frm_height  Height of the modal (empty)
*/
$frm_height = '';
/**
* $mode_form  Mode of the modal : fullscreen
*/
$mode_form = 'fullscreen';

include('apps'.DIRECTORY_SEPARATOR.$_SESSION['config']['app_id'].DIRECTORY_SEPARATOR.'definition_mail_categories.php');

require_once "modules" . DIRECTORY_SEPARATOR . "visa" . DIRECTORY_SEPARATOR
			. "class" . DIRECTORY_SEPARATOR
			. "class_modules_tools.php";
$_ENV['date_pattern'] = "/^[0-3][0-9]-[0-1][0-9]-[1-2][0-9][0-9][0-9]$/";

function writeLogIndex($EventInfo)
{
    $logFileOpened = fopen($_SESSION['config']['logdir']."visa_mail.log", 'a');
    fwrite($logFileOpened, '[' . date('d') . '/' . date('m') . '/' . date('Y')
        . ' ' . date('H') . ':' . date('i') . ':' . date('s') . '] ' . $EventInfo
        . "\r\n"
    );
    fclose($logFileOpened);
}




/**
 * Gets the path of the file to displays
 *
 * @param $res_id String Resource identifier
 * @param $coll_id String Collection identifier
 * @return String File path
 **/
function get_file_path($res_id, $coll_id)
{
    require_once("core".DIRECTORY_SEPARATOR."class".DIRECTORY_SEPARATOR."class_security.php");
    $sec =new security();
    $view = $sec->retrieve_view_from_coll_id($coll_id);
    if(empty($view))
    {
        $view = $sec->retrieve_table_from_coll($coll_id);
    }
    $db = new dbquery();
    $db->connect();
    $db->query("select docserver_id, path, filename from ".$view." where res_id = ".$res_id);
    $res = $db->fetch_object();
    $path = preg_replace('/#/', DIRECTORY_SEPARATOR, $res->path);
    $docserver_id = $res->docserver_id;
    $filename = $res->filename;
    $db->query("select path_template from ".$_SESSION['tablename']['docservers']." where docserver_id = '".$docserver_id."'");
    $res = $db->fetch_object();
    $docserver_path = $res->path_template;

    return $docserver_path.$path.$filename;
}

function check_category($coll_id, $res_id)
{
    require_once("core".DIRECTORY_SEPARATOR."class".DIRECTORY_SEPARATOR."class_security.php");
    $sec =new security();
    $view = $sec->retrieve_view_from_coll_id($coll_id);

    $db = new dbquery();
    $db->connect();
    $db->query("select category_id from ".$view." where res_id = ".$res_id);
    $res = $db->fetch_object();

    if(!isset($res->category_id))
    {
        $ind_coll = $sec->get_ind_collection($coll_id);
        $table_ext = $_SESSION['collections'][$ind_coll]['extensions'][0];
        $db->query("insert into ".$table_ext." (res_id, category_id) VALUES (".$res_id.", '".$_SESSION['coll_categories']['letterbox_coll']['default_category']."')");
        //$db->show();
    }
}

function get_rep_path($res_id, $coll_id)
{
    require_once("core".DIRECTORY_SEPARATOR."class".DIRECTORY_SEPARATOR."class_security.php");
    require_once("core".DIRECTORY_SEPARATOR."class".DIRECTORY_SEPARATOR."docservers_controler.php");
	$docserverControler = new docservers_controler();
    $sec =new security();
    $view = $sec->retrieve_view_from_coll_id($coll_id);
    if(empty($view))
    {
        $view = $sec->retrieve_table_from_coll($coll_id);
    }
    $db = new dbquery();
    $db->connect();

    $db->query("select docserver_id, path, filename from ".$view." where res_id = ".$res_id);
    $res = $db->fetch_object();
    $docserver_id = $res->docserver_id;
	
	
	$db->query("select path_template from ".$_SESSION['tablename']['docservers']." where docserver_id = '".$docserver_id."'");
    $res = $db->fetch_object();
    $docserver_path = $res->path_template;
	$db->query("select filename, path,title,res_id,res_id_version,attachment_type  from res_view_attachments where res_id_master = " . $res_id . " AND status <> 'OBS' AND status <> 'DEL' and attachment_type IN ('response_project','signed_response') order by creation_date asc");
	$array_reponses = array();
	$cpt_rep = 0;
	while ($res2 = $db->fetch_object()){
		$filename=$res2->filename;
		$path = preg_replace('/#/', DIRECTORY_SEPARATOR, $res2->path);
		$filename_pdf = str_replace(pathinfo($filename, PATHINFO_EXTENSION), "pdf",$filename);
		if (is_file($docserver_path.$path.$filename_pdf)){
			$array_reponses[$cpt_rep]['path'] = $docserver_path.$path.$filename_pdf;
			$array_reponses[$cpt_rep]['title'] = $res2->title;
			$array_reponses[$cpt_rep]['attachment_type'] = $res2->attachment_type;
			if ($res2->res_id_version == 0){
				$array_reponses[$cpt_rep]['res_id'] = $res2->res_id;
				$array_reponses[$cpt_rep]['is_version'] = 0;
			}
			else{
				$array_reponses[$cpt_rep]['res_id'] = $res2->res_id_version;
				$array_reponses[$cpt_rep]['is_version'] = 1;
			}
			$cpt_rep++;
		}
	}
    return $array_reponses;
}

function getDocsBasket(){
	$db = new dbquery();
	$db->connect();
	$orderstr = "order by creation_date desc";
	if (isset($_SESSION['last_order_basket'])) $orderstr = $_SESSION['last_order_basket'];
	$requete = "select res_id from ".$_SESSION['current_basket']['view']." where " . $_SESSION['current_basket']['clause'] . " $orderstr";
	$db->query($requete, true);
	$tab_docs = array();
	while($res = $db->fetch_object()){
		array_push($tab_docs,$res->res_id);
	}
	return $tab_docs;
}

function get_form_txt($values, $path_manage_action,  $id_action, $table, $module, $coll_id, $mode )
{
    if (preg_match("/MSIE 6.0/", $_SERVER["HTTP_USER_AGENT"]))
    {
        $browser_ie = true;
        $display_value = 'block';
    }
    elseif(preg_match('/msie/i', $_SERVER["HTTP_USER_AGENT"]) && !preg_match('/opera/i', $_SERVER["HTTP_USER_AGENT"]) )
    {
        $browser_ie = true;
        $display_value = 'block';
    }
    else
    {
        $browser_ie = false;
        $display_value = 'table-row';
    }
    unset($_SESSION['m_admin']['contact']);
    $_SESSION['req'] = "action";
    $res_id = $values[0];
    $_SESSION['doc_id'] = $res_id;

		// Ouverture de la modal

	$docLockerCustomPath = 'apps/maarch_entreprise/actions/docLocker.php';
    $docLockerPath = $_SESSION['config']['businessappurl'] . '/actions/docLocker.php';
    if (is_file($docLockerCustomPath))
        require_once $docLockerCustomPath;
    else if (is_file($docLockerPath))
        require_once $docLockerPath;
    else
        exit("can't find docLocker.php");

    $docLocker = new docLocker($res_id);
    if (!$docLocker->canOpen()) {
        $docLockerscriptError = '<script>';
            $docLockerscriptError .= 'destroyModal("modal_' . $id_action . '");';
            $docLockerscriptError .= 'alert("'._DOC_LOCKER_RES_ID.''.$res_id.''._DOC_LOCKER_USER.' ' . $_SESSION['userLock'] . '");';
        $docLockerscriptError .= '</script>';
        return $docLockerscriptError;
    }

    $frm_str = '';
    require_once("core".DIRECTORY_SEPARATOR."class".DIRECTORY_SEPARATOR."class_security.php");
    require_once("apps".DIRECTORY_SEPARATOR.$_SESSION['config']['app_id'].DIRECTORY_SEPARATOR."class".DIRECTORY_SEPARATOR."class_business_app_tools.php");
    require_once("modules".DIRECTORY_SEPARATOR."basket".DIRECTORY_SEPARATOR."class".DIRECTORY_SEPARATOR."class_modules_tools.php");
    require_once("apps".DIRECTORY_SEPARATOR.$_SESSION['config']['app_id'].DIRECTORY_SEPARATOR."class".DIRECTORY_SEPARATOR."class_types.php");
    require_once("core".DIRECTORY_SEPARATOR."class".DIRECTORY_SEPARATOR."class_request.php");

    $sec =new security();
    $core_tools =new core_tools();
    $b = new basket();
    $type = new types();
    $business = new business_app_tools();
	
	/*check_category($coll_id, $res_id);
    $data = get_general_data($coll_id, $res_id, 'minimal');*/
/*
    echo '<pre>';
    print_r($data);
    echo '</pre>';exit;
*/
	$db = new dbquery();
    $db->connect();
	$view = $sec->retrieve_view_from_coll_id($coll_id);
	$db->query("select alt_identifier, status from " 
		. $view 
		. " where res_id = " . $res_id);
	$resChrono = $db->fetch_object();
	$chrono_number = $resChrono->alt_identifier;
	$currentStatus = $resChrono->status;
    $frm_str .= '<h2 class="tit" id="action_title">'._VISA_MAIL.' '._NUM.'<span id="numIdDocPage">'.$res_id.'</span>';
    $frm_str .= '</h2>';
	
	$frm_str .= '<div id="visa_listDoc">';
	$frm_str .= '<div class="listDocsBasket">';
	$tab_docs = getDocsBasket();
	//$frm_str .= '<pre>'.print_r($tab_docs,true).'</pre>';
	//$selectedCat = '';
	$list_docs = '';
	foreach($tab_docs as $num=>$res_id_doc){
		$list_docs .= $res_id_doc."#";
		if ($res_id_doc == $res_id){
			$classLine = ' class="selectedId" ';
		}
		else $classLine = ' class="unselectedId" ';
		$frm_str .= '<div '.$classLine.' onmouseover="this.style.cursor=\'pointer\';" onclick="loadNewId(\'index.php?display=true&module=visa&page=update_visaPage\','.$res_id_doc.',\''.$coll_id.'\');" id="list_doc_'.$res_id_doc.'">';
		check_category($coll_id, $res_id_doc);
		$data = get_general_data($coll_id, $res_id_doc, 'minimal');
		
		if ($res_id_doc == $res_id){
			$selectedCat = $data['category_id']['value'];
			$curNumDoc = $num;
			$curdest = $data['destination'];
		}
		
		$frm_str .= '<ul>';
		$frm_str .= '<li><b>';
		$frm_str .= $chrono_number . ' - ' .$res_id_doc;
		$frm_str .= '</b></li>';
		
		$frm_str .= '<li>';
		$frm_str .= '<i class="fa fa-user" title="Contact"></i> ';
		if(isset($data['contact']) && !empty($data['contact']))
        {
			if (strlen($data['contact']) > 25) $contact = substr($data['contact'],0,25).'...';
			else $contact = $data['contact'];
			$frm_str .= $contact;
		}
		$frm_str .= '</li>';
		
		$frm_str .= '<li>';
		$frm_str .= '<i class="fa fa-file" title="Objet"></i> ';
		if(isset($data['subject']) && !empty($data['subject']))
        {
			if (strlen($data['subject']) > 80) $subject = substr($data['subject'],0,80).'...';
			else $subject = $data['subject'];
			$frm_str .= $subject;
		}
		$frm_str .= '</li>';
		
		$frm_str .= '<li>';
		$frm_str .= '<i class="fa fa-calendar " title="Date d\'arrivée"></i> ';
		$frm_str .= $data['admission_date'];
		$frm_str .= ' <i class="fa fa-bell" title="Date limite"></i> ';
		$frm_str .= $data['process_limit_date'];
		$frm_str .= '</li>';
		
		$frm_str .= '</ul>';
		
		$frm_str .= '</div>';
	}
	$frm_str .= '</div>';
	
	$frm_str .= '<div class="toolbar">';
	$frm_str .= '<table>';	
	$frm_str .= '<tr>';
		$frm_str .= '<td style="width:33%";">';	
		$frm_str .= '<a href="javascript://" id="previous_doc" onclick="previousDoc(\'index.php?display=true&module=visa&page=update_visaPage\', \''.$coll_id.'\');"><i class="fa fa-chevron-up fa-2x" title="Précédent"></i></a>';
		
		$frm_str .= '</td>';
		
		$frm_str .= '<td style="width:33%";">';	
		$frm_str .= '<a href="javascript://" id="next_doc" onclick="nextDoc(\'index.php?display=true&module=visa&page=update_visaPage\', \''.$coll_id.'\');"><i class="fa fa-chevron-down fa-2x" title="Suivant"></i></a>';
		
		$frm_str .= '</td>';
		
		$frm_str .= '<td style="width:33%";">';	
		$frm_str .= '<a href="javascript://" id="cancel" onclick="javascript:$(\'baskets\').style.visibility=\'visible\';destroyModal(\'modal_'.$id_action.'\');reinit();"><i class="fa fa-undo fa-2x" title="Annuler"></i></a>';
		
		$frm_str .= '</td>';
	$frm_str .= '</tr>';	
	$frm_str .= '</table>';	
	$frm_str .= '</div>';
	$frm_str .= '</div>';
	
	$frm_str .= '<div id="visa_left">';
	$frm_str .= '<dl id="tabricatorLeft" >';
	
	//Onglet document
	$frm_str .= '<dt id="onglet_entrant">'._INCOMING.'</dt><dd style="overflow-y: hidden;">';
	$frm_str .= '<iframe src="'.$_SESSION['config']['businessappurl'].'index.php?display=true&dir=indexing_searching&page=view_resource_controler&visu&id='. $res_id.'&coll_id='.$coll_id.'" name="viewframevalidDoc" id="viewframevalidDoc"  scrolling="auto" frameborder="0"  style="width:100%;height:100%;" ></iframe></dd>';
	
	$frm_str .= '</dd>';
	
	//Onglet Avancement 
	
	$frm_str .= '<dt id="onglet_avancement">Avancement</dt><dd id="page_avancement" style="overflow-x: hidden;">';
	$frm_str .= '<h2>'. _WF .'</h2>';
	$frm_str .= '<iframe src="' . $_SESSION['config']['businessappurl'].'index.php?display=true&dir=indexing_searching&page=document_workflow_history&id='. $res_id .'&coll_id='. $coll_id.'&load&size=full&small=true" name="workflow_history_document" width="100%" height="620px" align="left" scrolling="yes" frameborder="0" id="workflow_history_document"></iframe>';
	$frm_str .= '<br/>';
	$frm_str .= '<br/>';
	
	$frm_str .= '<span style="cursor: pointer;" onmouseover="this.style.cursor=\'pointer\';" onclick="new Effect.toggle(\'history_document\', \'blind\', {delay:0.2});whatIsTheDivStatus(\'history_document\', \'divStatus_all_history_div\');return false;">';
	$frm_str .= '<span id="divStatus_all_history_div" style="color:#1C99C5;"><<</span>';
	$frm_str .= '<b>&nbsp;'. _ALL_HISTORY .'</b>';
	$frm_str .= '</span>';
	$frm_str .= '<iframe src="' . $_SESSION['config']['businessappurl'].'index.php?display=true&dir=indexing_searching&page=document_history&id='. $res_id .'&coll_id='. $coll_id.'&load&size=full&small=true" name="history_document" width="100%" height="620px" align="left" scrolling="yes" frameborder="0" id="history_document" style="display:none;"></iframe>';

	$frm_str .= '</dd>';
	
	//Onglet Circuit 
	$frm_str .= '<dt id="onglet_circuit">'._VISA_WORKFLOW.'</dt><dd id="page_circuit" style="overflow-x: hidden;">';
	$frm_str .= '<h2>'._VISA_WORKFLOW.'</h2>';
	
	$modifVisaWorkflow = false;
    if ($core->test_service('config_visa_workflow', 'visa', false)) {
        $modifVisaWorkflow = true;
    }
	$visa = new visa();
	
	$frm_str .= '<div class="error" id="divError" name="divError"></div>';
	$frm_str .= '<div style="text-align:center;">';
	$frm_str .= $visa->getList($res_id, $coll_id, $modifVisaWorkflow, 'VISA_CIRCUIT');
                
	$frm_str .= '</div><br>';
	/* Historique diffusion visa */
	$frm_str .= '<br/>'; 
		$frm_str .= '<br/>';                
		$frm_str .= '<span class="diff_list_visa_history" style="width: 90%; cursor: pointer;" onmouseover="this.style.cursor=\'pointer\';" onclick="new Effect.toggle(\'diff_list_visa_history_div\', \'blind\', {delay:0.2});whatIsTheDivStatus(\'diff_list_visa_history_div\', \'divStatus_diff_list_visa_history_div\');return false;">';
			$frm_str .= '<span id="divStatus_diff_list_visa_history_div" style="color:#1C99C5;"><<</span>';
			$frm_str .= '<b>&nbsp;<small>'._DIFF_LIST_VISA_HISTORY.'</small></b>';
		$frm_str .= '</span>';

		$frm_str .= '<div id="diff_list_visa_history_div" style="display:none">';

			$s_id = $res_id;
			$return_mode = true;
			$diffListType = 'VISA_CIRCUIT';
			require_once('modules/entities/difflist_visa_history_display.php');
						
	$frm_str .= '</div>';
	$frm_str .= '</dd>';
	
	//Onglet notes
	
	//Onglet notes
	if ($core->is_module_loaded('notes')){
		require_once "modules" . DIRECTORY_SEPARATOR . "notes" . DIRECTORY_SEPARATOR
							. "class" . DIRECTORY_SEPARATOR
							. "class_modules_tools.php";
		$notes_tools    = new notes();
						
		//Count notes
		$nbr_notes = $notes_tools->countUserNotes($res_id, $coll_id);
		if ($nbr_notes > 0 ) $nbr_notes = ' ('.$nbr_notes.')';  else $nbr_notes = '';
		//Notes iframe
		$frm_str .= '<dt id="onglet_notes">'. _NOTES.$nbr_notes .'</dt><dd id="page_notes" style="overflow-x: hidden;"><h2>'. _NOTES .'</h2><iframe name="list_notes_doc" id="list_notes_doc" src="'. $_SESSION['config']['businessappurl'].'index.php?display=true&module=notes&page=notes&identifier='. $res_id .'&origin=document&coll_id='.$coll_id.'&load&size=full" frameborder="0" scrolling="no" width="99%" height="570px"></iframe></dd> ';	
	}
		
	
	$frm_str .= '</dl>';
	$frm_str .= '</div>';
	
	$frm_str .= '<div id="visa_right">';
	$frm_str .= '<dl id="tabricatorRight" >';
	$tab_path_rep_file = get_rep_path($res_id, $coll_id);
	for ($i=0; $i<count($tab_path_rep_file);$i++){
		$num_rep = $i+1;
		if (strlen($tab_path_rep_file[$i]['title']) > 20) $titleRep = substr($tab_path_rep_file[$i]['title'],0,20).'...';
		else $titleRep = $tab_path_rep_file[$i]['title'];
		$frm_str .= '<dt id="ans_'.$num_rep.'" onclick="updateFunctionModifRep(\''.$tab_path_rep_file[$i]['res_id'].'\', '.$num_rep.', '.$tab_path_rep_file[$i]['is_version'].');">'.$titleRep.'</dt><dd>';
		$frm_str .= '<iframe src="'.$_SESSION['config']['businessappurl'].'index.php?display=true&module=visa&page=view_doc&path='
			. $tab_path_rep_file[$i]['path'].'" name="viewframevalidRep'.$num_rep.'" id="viewframevalidRep'.$num_rep.'"  scrolling="auto" frameborder="0" style="width:100%;height:100%;" ></iframe>';
		 $frm_str .= '</dd>';
	}
	
		$countAttachments = "select res_id from "
            . $_SESSION['tablename']['attach_res_attachments']
            . " where status NOT IN ('DEL','OBS') and res_id_master = " . $res_id . " and coll_id = '" . $coll_id . "'";
		$dbAttach = new dbquery();
		$dbAttach->query($countAttachments);
		if ($dbAttach->nb_result() > 0) {
			$nb_attach = ' (' . ($dbAttach->nb_result()). ')';
		}
	
		$frm_str .= '<dt id="onglet_pj" onclick="$(\'cur_idAffich\').value=0;">'. _ATTACHED_DOC .$nb_attach.'</dt><dd id="page_pj">';
		
		if ($core_tools->is_module_loaded('attachments')) {
        require 'modules/templates/class/templates_controler.php';
        $templatesControler = new templates_controler();
        $templates = array();
        $templates = $templatesControler->getAllTemplatesForProcess($curdest);
        $_SESSION['destination_entity'] = $curdest;
        //var_dump($templates);
        $frm_str .= '<div id="list_answers_div" onmouseover="this.style.cursor=\'pointer\';" style="width:920px;">';
            $frm_str .= '<div class="block" style="margin-top:-2px;">';
                $frm_str .= '<div id="processframe" name="processframe">';
                    $frm_str .= '<center><h2>' . _PJ . ', ' . _ATTACHEMENTS . '</h2></center>';
                    $req = new request;
                    $req->connect();
                    $req->query("select res_id from ".$_SESSION['tablename']['attach_res_attachments']
                        . " where (status = 'A_TRA' or status = 'TRA') and res_id_master = " . $res_id . " and coll_id = '" . $coll_id . "'");
                    //$req->show();
                    $nb_attach = 0;
                    if ($req->nb_result() > 0) {
                        $nb_attach = $req->nb_result();
                    }
                    $frm_str .= '<div class="ref-unit">';
                    
                    $frm_str .= '<center>';
                    if ($core_tools->is_module_loaded('templates')) {
                        $frm_str .= '<input type="button" name="attach" id="attach" class="button" value="'
                            . _CREATE_PJ
                            .'" onclick="showAttachmentsForm(\'' . $_SESSION['config']['businessappurl']
                            . 'index.php?display=true&module=attachments&page=attachments_content\')" />';
                    }
                    $frm_str .= '</center><iframe name="list_attach" id="list_attach" src="'
                    . $_SESSION['config']['businessappurl']
                    . 'index.php?display=true&module=attachments&page=frame_list_attachments&load" '
                    . 'frameborder="0" width="900px" scrolling="yes" height="600px" scrolling="yes" ></iframe>';
                    $frm_str .= '</div>';
                $frm_str .= '</div>';
            $frm_str .= '</div>';
            $frm_str .= '<hr />';
        $frm_str .= '</div>';
    }
	
	
		$frm_str .= '</dd>';
					
	/* AJOUT DE LA PARTIE DES VERSIONS POUR LE COURRIER SPONTANE */
	if ( $core->is_module_loaded('content_management') && $selectedCat == 'outgoing') {
        $versionTable = $sec->retrieve_version_table_from_coll_id(
            $coll_id
        );
        $selectVersions = "select res_id from "
            . $versionTable . " where res_id_master = "
            . $res_id . " and status <> 'DEL' order by res_id desc";
        $dbVersions = new dbquery();
        $dbVersions->connect();
        $dbVersions->query($selectVersions);
        $nb_versions_for_title = $dbVersions->nb_result();
        $lineLastVersion = $dbVersions->fetch_object();
        $lastVersion = $lineLastVersion->res_id;
        if ($lastVersion <> '') {
            $objectId = $lastVersion;
            $objectTable = $versionTable;
        } else {
            $objectTable = $sec->retrieve_table_from_coll(
                $coll_id
            );
            $objectId = $res_id;
            $_SESSION['cm']['objectId4List'] = $res_id;
        }
        if ($nb_versions_for_title == 0) {
            $extend_title_for_versions = '0';
        } else {
            $extend_title_for_versions = $nb_versions_for_title;
        }
        $_SESSION['cm']['resMaster'] = '';
		$frm_str .= '<dt>' . _VERSIONS .' -'.$data['category_id']['value']. ' (<span id="nbVersions">' . $extend_title_for_versions . '</span>)</dt><dd>';
		$frm_str .= '<h2>';
			$frm_str .= '<center>' . _VERSIONS . '</center>';
		$frm_str .= '</h2>';
		$frm_str .= '<div class="error" id="divError" name="divError"></div>';
		$frm_str .= '<div style="text-align:center;">';
			$frm_str .= '<a href="';
				$frm_str .=  $_SESSION['config']['businessappurl'];
				$frm_str .= 'index.php?display=true&dir=indexing_searching&page=view_resource_controler&original&id=';
				$frm_str .= $res_id;
				$frm_str .= '" target="_blank">';
				$frm_str .= '<img alt="' . _VIEW_ORIGINAL . '" src="';
				$frm_str .= $_SESSION['config']['businessappurl'];
				$frm_str .= 'static.php?filename=picto_dld.gif" border="0" alt="" />';
				$frm_str .= _VIEW_ORIGINAL . ' | ';
			$frm_str .= '</a>';
			if ($core->test_service('add_new_version_init', 'apps', false)) {
				$_SESSION['cm']['objectTable'] = $objectTable;
				$frm_str .= '<div id="createVersion" style="display: inline;"></div>';
			}
			$frm_str .= '<div id="loadVersions"></div>';
			$frm_str .= '<script language="javascript">';
				$frm_str .= 'showDiv("loadVersions", "nbVersions", "createVersion", "';
					$frm_str .= $_SESSION['urltomodules'];
					$frm_str .= 'content_management/list_versions.php")';
			$frm_str .= '</script>';
		$frm_str .= '</div><br>';
		$frm_str .= '</dd>';
    }
	$frm_str .= '</dl>';
	$frm_str .= '<div class="toolbar">';
	$frm_str .= '<table style="width:90%;">';	
	
	$frm_str .= '<tr>';
	$frm_str .= '<td>';	
		$frm_str .= '<form name="index_file" method="post" id="index_file" action="#" class="forms " style="text-align:left;">';
		$frm_str .= 'Consigne <input type="text" value="'.$visa->getConsigne($res_id, $coll_id, $_SESSION['user']['UserId']).'" style="width:30%;" readonly/><br/>';
		$frm_str .= '<b>'._ACTIONS.' : </b>';
		$actions  = $b->get_actions_from_current_basket($res_id, $coll_id, 'PAGE_USE');
		if(count($actions) > 0)
		{
			$frm_str .='<select name="chosen_action" id="chosen_action">';
				$frm_str .='<option value="">'._CHOOSE_ACTION.'</option>';
				for($ind_act = 0; $ind_act < count($actions);$ind_act++)
				{
					if (!($actions[$ind_act]['VALUE'] == "end_action" && $visa->getCurrentStep($res_id, $coll_id, 'VISA_CIRCUIT') == $visa->nbVisa($res_id, $coll_id))){
						$frm_str .='<option value="'.$actions[$ind_act]['VALUE'].'"';
						if($ind_act==0)
						{
							$frm_str .= 'selected="selected"';
						}
						$frm_str .= '>'.$actions[$ind_act]['LABEL'].'</option>';
					}
				}
			$frm_str .='</select> ';
			$table = $sec->retrieve_table_from_coll($coll_id);
			$frm_str .= '<input type="button" name="send" id="send_action" value="'._VALIDATE.'" class="button" onclick="valid_action_form( \'index_file\', \''.$path_manage_action.'\', \''. $id_action.'\', \''.$res_id.'\', \''.$table.'\', \''.$module.'\', \''.$coll_id.'\', \''.$mode.'\');"/> ';
		}
		
		
		$frm_str .= '<input type="hidden" name="cur_rep" id="cur_rep" value="'.$tab_path_rep_file[0]['res_id'].'" >';
		$frm_str .= '<input type="hidden" name="cur_idAffich" id="cur_idAffich" value="1" >';
		$frm_str .= '<input type="hidden" name="cur_resId" id="cur_resId" value="'.$res_id.'" >';
		$frm_str .= '<input type="hidden" name="list_docs" id="list_docs" value="'.$list_docs.'" >';
		
		$frm_str .= '<input type="hidden" name="values" id="values" value="'.$res_id.'" />';
		$frm_str .= '<input type="hidden" name="action_id" id="action_id" value="'.$id_action.'" />';
		$frm_str .= '<input type="hidden" name="mode" id="mode" value="'.$mode.'" />';
		$frm_str .= '<input type="hidden" name="table" id="table" value="'.$table.'" />';
		$frm_str .= '<input type="hidden" name="coll_id" id="coll_id" value="'.$coll_id.'" />';
		$frm_str .= '<input type="hidden" name="module" id="module" value="'.$module.'" />';
		$frm_str .= '<input type="hidden" name="category_id" id="category_id" value="'.$data['category_id']['value'].'" />';
		$frm_str .= '<input type="hidden" name="req" id="req" value="second_request" />';
	
	
		//$frm_str .= '<input type="hidden" name="next_resId" id="next_resId" value="'.$nextId.'" >';
		$frm_str .= '</form>';
		$frm_str .= '</td>';
		$frm_str .= '<td style="width:25%";">';	
		//modifier en fonction du statut URGENT
		if ($core->test_service('sign_document', 'visa', false) && $currentStatus == 'ESIG') {
			$color = ' style="" ';
			if ($tab_path_rep_file[0]['attachment_type'] == 'signed_response') $color = ' style="color:green" ';
			$frm_str .= '<a href="javascript://" id="sign_link_certif" '.$color.' onclick="';
			$frm_str .= 'signFile('.$tab_path_rep_file[0]['res_id'].','.$tab_path_rep_file[0]['is_version'].',0);';
			$frm_str .= '"><i class="fm fm-file-fingerprint fm-3x" title="Signer ces projets de réponse (avec certificat)"></i></a>';
			
			$frm_str .= ' <a href="javascript://" id="sign_link" '.$color.' onclick="';
			$frm_str .= 'signFile('.$tab_path_rep_file[0]['res_id'].','.$tab_path_rep_file[0]['is_version'].',1);';
			$frm_str .= '"><i class="fa fa-check fa-3x" title="Signer ces projets de réponse (sans certificat)"></i></a>';
		}
		
		$displayModif = ' style="" ';
		if ($tab_path_rep_file[0]['attachment_type'] == 'signed_response')
			$displayModif = ' style="display:none;" ';
		
		$frm_str .= ' <a href="javascript://" id="update_rep_link" '.$displayModif.'onclick="';
		if ($tab_path_rep_file[0]['is_version'] == 0) $frm_str .= 'modifyAttachmentsForm(\''.$_SESSION['config']['businessappurl'] . 'index.php?display=true&module=attachments&page=attachments_content&id='.$tab_path_rep_file[0]['res_id'].'&relation=1&fromDetail=\',\'98%\',\'auto\');';
		else  $frm_str .= 'modifyAttachmentsForm(\''.$_SESSION['config']['businessappurl'] . 'index.php?display=true&module=attachments&page=attachments_content&id='.$tab_path_rep_file[0]['res_id'].'&relation=2&fromDetail=\',\'98%\',\'auto\');';
		$frm_str .= '"><i class="fa fa-pencil-square-o fa-3x" title="Modifier la réponse"></i></a>';
		
		$frm_str .= '</td>';
		$frm_str .= '</tr>';	
	$frm_str .= '</table>';	
	
	$frm_str .= '</div>';	
	$frm_str .= '</div>';
	
	$frm_str .= '<div id="modalPIN">';
	$frm_str .= '<label for="valuePIN">Saisissez votre code PIN</label>';
	$frm_str .= '<input type="password" name="valuePIN" id="valuePIN"/><br/>';
	$frm_str .= '<input type="button" name="sendPIN" id="sendPIN" value="'._VALIDATE.'" class="button" onclick="signFile('.$tab_path_rep_file[0]['res_id'].','.$tab_path_rep_file[0]['is_version'].',\'\', $(\'valuePIN\').value);" />';
	$frm_str .= '</div>';
	
	
	/*** Extra javascript ***/
	$frm_str .= '<script type="text/javascript">launchTabri();window.scrollTo(0,0);$(\'divList\').style.display = \'none\';';
	$frm_str .='</script>';
	return addslashes($frm_str);
}

/**
 * Checks the action form
 *
 * @param $form_id String Identifier of the form to check
 * @param $values Array Values of the form
 * @return Bool true if no error, false otherwise
 **/
function check_form($form_id,$values)
{
		//writeLogIndex("GO check_form !!");

    $_SESSION['action_error'] = '';
    if(count($values) < 1 || empty($form_id))
    {
        $_SESSION['action_error'] =  _FORM_ERROR;
        return false;
    }
    else
    {
       
        return true;
    }
}

/**
 * Get the value of a given field in the values returned by the form
 *
 * @param $values Array Values of the form to check
 * @param $field String the field
 * @return String the value, false if the field is not found
 **/
function get_value_fields($values, $field)
{
    for($i=0; $i<count($values);$i++)
    {
        if($values[$i]['ID'] == $field)
        {
            return  $values[$i]['VALUE'];
        }
    }
    return false;
}


/**
 * Action of the form : update the database
 *
 * @param $arr_id Array Contains the res_id of the document to validate
 * @param $history String Log the action in history table or not
 * @param $id_action String Action identifier
 * @param $label_action String Action label
 * @param $status String  Not used here
 * @param $coll_id String Collection identifier
 * @param $table String Table
 * @param $values_form String Values of the form to load
 **/
function manage_form($arr_id, $history, $id_action, $label_action, $status,  $coll_id, $table, $values_form )
{
	$res_id = $arr_id[0];
	
	$act_chosen = get_value_fields($values_form, 'chosen_action');
	
	if ($act_chosen == "end_action"){
		require_once("core".DIRECTORY_SEPARATOR."class".DIRECTORY_SEPARATOR."class_security.php");
		$sec = new security();
		$table = $sec->retrieve_table_from_coll($coll_id);
		
		$db = new dbquery();
		$db->connect();
		$up_request = "UPDATE listinstance SET process_date = CURRENT_TIMESTAMP WHERE res_id = $res_id AND item_id='".$_SESSION['user']['UserId']."' AND difflist_type = 'VISA_CIRCUIT'";
		$db->query($up_request);
		
		$circuit_visa = new visa();
		if ($circuit_visa->allUserVised($res_id, $coll_id, 'VISA_CIRCUIT')){
			$up_request = "UPDATE res_letterbox SET status='ESIG' WHERE res_id = $res_id";
			$db->query($up_request);
		}
	}
    return array('result' => $res_id.'#', 'history_msg' => '');
}