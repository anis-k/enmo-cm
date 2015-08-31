<?php
/**
* Reopen Mail Class
*
* Contains all the specific functions to reopen mail
*
* @package  Maarch LetterBox 2.0
* @version 2.0
* @since 06/2007
* @license GPL
* @author  Claire Figueras  <dev@maarch.org>
*
*/

/**
* Class ReopenMail : Contains all the specific functions to reopen a mail
*
* @author  Claire Figueras  <dev@maarch.org>
* @license GPL
* @package Maarch LetterBox 2.0
* @version 2.0
*/


class ReopenMail extends Database
{

    /**
    * Redefinition of the LetterBox object constructor
    */
    function __construct()
    {
        parent::__construct();
    }

    /**
    * Checks the res_id
    *
    * @param string $mode add or up
    */
    public function reopen_mail_check()
    {
        if (!empty($_REQUEST['id']) && !empty($_REQUEST['ref_id'])) {
            $_SESSION['error'] = _ENTER_REF_ID_OR_GED_ID;
            $_SESSION['m_admin']['reopen_mail']['REF_ID'] = '';
            $_SESSION['m_admin']['reopen_mail']['ID'] = '';
            return false;
        }
        if (empty($_REQUEST['id']) && empty($_REQUEST['ref_id'])) {
            $_SESSION['error'] = _REF_ID . ', ' . _GED_ID . ' ' . _IS_EMPTY;
        } else {
            if (!empty($_REQUEST['ref_id'])) {
                $_SESSION['m_admin']['reopen_mail']['REF_ID'] = $_REQUEST['ref_id'];
            } elseif (!empty($_REQUEST['id'])) {
                $_SESSION['m_admin']['reopen_mail']['ID'] = $this->wash(
                    $_REQUEST['id'], 'num',  _GED_ID . ' ');
            }
        }
    }

    /**
    * Update databse
    *
    */
    public function update_db()
    {
        $db = new Database();
        // add ou modify users in the database
        $this->reopen_mail_check();
        if (! empty($_SESSION['error'])) {
            header(
                'location: ' . $_SESSION['config']['businessappurl']
                . 'index.php?page=reopen_mail&id='
                . $_SESSION['m_admin']['reopen_mail']['ID']
                . '&ref_id=' . $_SESSION['m_admin']['reopen_mail']['REF_ID']
                . '&admin=reopen_mail'
            );
            exit();
        } else {
            require_once 'core/class/class_security.php';

            $sec = new security();
            $ind_coll = $sec->get_ind_collection('letterbox_coll');
            $table = $_SESSION['collections'][$ind_coll]['table'];

            if (!empty($_SESSION['m_admin']['reopen_mail']['REF_ID'])) { 
                $stmt = $db->query(
                    "SELECT res_id, alt_identifier, status FROM res_view_letterbox WHERE alt_identifier = ?", array($_SESSION['m_admin']['reopen_mail']['REF_ID'])
                );
                $result_object=$stmt->fetchObject();
                $res_id = $result_object->res_id;
                $_SESSION['m_admin']['reopen_mail']['ID'] = $res_id;
                $errorMsg = _REF_ID . ' ' . _UNKNOWN;
            } elseif (!empty($_SESSION['m_admin']['reopen_mail']['ID'])) {
                $stmt = $db->query(
                    'SELECT res_id, alt_identifier, status FROM res_view_letterbox WHERE res_id = ?', array($_SESSION['m_admin']['reopen_mail']['ID']) 
                );
                $errorMsg = _GED_ID . ' ' . _UNKNOWN;
            }
            
            if ($stmt->rowCount() == 0) {
                $_SESSION['error'] = $errorMsg;
                header(
                    'location: ' . $_SESSION['config']['businessappurl']
                    . 'index.php?page=reopen_mail&id='
                    . $_SESSION['m_admin']['reopen_mail']['ID']
                    . '&admin=reopen_mail'
                );
                exit();
            }
            
            $db->query(
                'UPDATE ' . $table . " SET status = ? where res_id = ?"
                , array($_REQUEST['status_id'], $_SESSION['m_admin']['reopen_mail']['ID'])
            );

            $stmt = $db->query("SELECT id, label_status FROM status WHERE id = ?", array($_REQUEST['status_id']));
            while ( $line = $stmt->fetchObject()) {$label_status = $line->label_status;}

            $historyMsg = _MODIFICATION_OF_THE_STATUS_FROM_THIS_MAIL .$label_status. ' du courrier ';
            if ($resultRes->alt_identifier <> '') {
                $historyMsg .= $resultRes->alt_identifier . ' (' . $_SESSION['m_admin']['reopen_mail']['ID'] . ')';
            } else {
                $historyMsg .= $_SESSION['m_admin']['reopen_mail']['ID'];
            }
            
            if ($_SESSION['history']['resup'] == true) {
                require_once 'core/class/class_history.php';
                $hist = new history();
                $hist->add(
                    $table, $_SESSION['m_admin']['reopen_mail']['ID'], 'UP','resup',
                    $historyMsg,
                    $_SESSION['config']['databasetype'], 'apps'
                );
            }

            $_SESSION['error'] = $historyMsg;
            
            unset($_SESSION['m_admin']);
            header(
                'location: ' . $_SESSION['config']['businessappurl']
                . 'index.php?page=admin'
            );
            exit();
        }
    }

    /**
    * Form to reopen a mail
    *
    */
    public function formreopenmail()
    {
        $db = new Database();

        $stmt = $db->query(
            "SELECT  id, label_status FROM status WHERE is_folder_status = 'N' ");

        $notesList = '';
        if ($stmt->rowCount() < 1) {
            $notesList = 'No contact or error query';
        }

        ?>
        <h1><i class="fa fa-envelope-square fa-2x"></i> <?php echo _REOPEN_MAIL;?></h1>

        <div id="inner_content" class="clearfix" align="center">
        <div class="block">
        <p ><?php echo _MAIL_SENTENCE2 . '<br />' . _MAIL_SENTENCE3 . '<br />' . _MAIL_SENTENCE4 . ' ' . _BASKETS . ' ' . _MAIL_SENTENCE5;?> </p>
          <br/>
          <p ></p>
          <form name="form1" method="post" action="<?php echo $_SESSION['config']['businessappurl']."index.php?display=true&admin=reopen_mail&page=reopen_mail_db";?>" >
          <p>
            <?php echo _ENTER_REF_ID;?> : 
                <input type="text" name="ref_id" id="ref_id" value="<?php if(isset($_SESSION['m_admin']['reopen_mail']['REF_ID'])){ functions::xecho($_SESSION['m_admin']['reopen_mail']['REF_ID']);}?>" />
            <?php echo _ENTER_DOC_ID;?> :  
                <input type="text" name="id" id="id" value="<?php if(isset($_SESSION['m_admin']['reopen_mail']['ID'])){ functions::xecho($_SESSION['m_admin']['reopen_mail']['ID']);}?>" />
          </p>
          <?php echo _CHOOSE_STATUS;?> : 
                                        <SELECT NAME='status_id'>
                                        <?php 
                                        while ( $line = $stmt->fetchObject()) {
                                            echo "<OPTION VALUE='".$line->id."'>".$line->label_status."</OPTION>";
                                        }
                                        ?>
                                        </SELECT>
             <br/>

           <p >(<?php echo _TO_KNOW_ID;?>) </p>

            <br/>
            <p class="buttons">
                    <input type="submit" name="Submit" value="<?php echo _VALIDATE;?>" class="button"/>
                    <input type="button" name="close" value="<?php echo _CANCEL;?>" onclick="javascript:window.location.href='<?php echo $_SESSION['config']['businessappurl'];?>index.php?page=admin';" class="button"/>
                </p>

          </form>
          </div>
        </div>
    <?php
    }
}
