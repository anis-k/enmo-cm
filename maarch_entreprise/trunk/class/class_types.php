<?php
/**
* Types Class
*
* Contains all the function to manage the doctypes
*
* @package  Maarch LetterBox 1.0
* @version 2.0
* @since 10/2005
* @license GPL
* @author  Claire Figueras  <dev@maarch.org>
*
*/

require_once "core" . DIRECTORY_SEPARATOR . "class" . DIRECTORY_SEPARATOR
    ."class_security.php";
require_once 'core/core_tables.php';
require_once "core" . DIRECTORY_SEPARATOR . "class" . DIRECTORY_SEPARATOR
    . "class_history.php";
/**
* Class types: Contains all the function to manage the doctypes
*
* @author  Claire Figueras  <dev@maarch.org>
* @license GPL
* @package Maarch LetterBox 1.0
* @version 1.1
*/
class types extends dbquery
{

    /**
    * Form to add, modify or propose a doc type
    *
    * @param string $mode val, up or prop
    * @param integer $id type identifier, empty by default
    */
    public function formtype($mode, $id="")
    {
        // form to add, modify or proposale a doc type
        $func = new functions();
        $core = new core_tools();
        $sec = new security();
        $state = true;
        if (! isset($_SESSION['m_admin']['doctypes'])) {
            $this->cleartypeinfos();
        }
        if ($mode <> "prop" && $mode <> "add") {
            $this->connect();
            $this->query(
                "select * from " . DOCTYPES_TABLE . " where type_id = " . $id
            );
            if ($this->nb_result() == 0) {
                $_SESSION['error'] = _DOCTYPE . ' ' . _ALREADY_EXISTS;
                $state = false;
            } else {
                $_SESSION['m_admin']['doctypes'] = array();
                $line = $this->fetch_object();
                $_SESSION['m_admin']['doctypes']['TYPE_ID'] = $line->type_id;
                $_SESSION['m_admin']['doctypes']['COLL_ID'] = $line->coll_id;
                $_SESSION['m_admin']['doctypes']['COLL_LABEL'] = $_SESSION['m_admin']['doctypes']['COLL_ID'];
                for ($i = 0; $i < count($_SESSION['collections']); $i ++) {
                    if ($_SESSION['collections'][$i]['id'] == $_SESSION['m_admin']['doctypes']['COLL_ID']) {
                        $_SESSION['m_admin']['doctypes']['COLL_LABEL'] = $_SESSION['collections'][$i]['label'];
                        break;
                    }
                }
                $_SESSION['m_admin']['doctypes']['LABEL'] = $this->show_string(
                    $line->description
                );
                $_SESSION['m_admin']['doctypes']['SUB_FOLDER'] = $line->doctypes_second_level_id;
                $_SESSION['m_admin']['doctypes']['VALIDATE'] = $line->enabled;
                $_SESSION['m_admin']['doctypes']['TABLE'] = $line->coll_id;
                $_SESSION['m_admin']['doctypes']['ACTUAL_COLL_ID'] = $line->coll_id;
                $_SESSION['m_admin']['doctypes']['indexes'] = $this->get_indexes(
                    $line->type_id, $line->coll_id, 'minimal'
                );
                $_SESSION['m_admin']['doctypes']['mandatory_indexes'] = $this->get_mandatory_indexes(
                    $line->type_id, $line->coll_id
                );
                $_SESSION['service_tag'] = 'doctype_up';
                $core->execute_modules_services(
                    $_SESSION['modules_services'], 'doctype_up', "include"
                );
                $core->execute_app_services($_SESSION['app_services'], 'doctype_up', 'include');
            }
        } else {// mode = add
            $_SESSION['m_admin']['doctypes']['indexes'] = array();
            $_SESSION['m_admin']['doctypes']['mandatory_indexes'] = array();
            $_SESSION['service_tag'] = 'doctype_add';
            echo $core->execute_modules_services(
                $_SESSION['modules_services'], 'doctype_up', "include"
            );
            $core->execute_app_services(
                $_SESSION['app_services'], 'doctype_up', 'include'
            );
            $_SESSION['service_tag'] = '';
        }
        ?>
        <h1><i class="fa fa-files-o fa-2x"></i>
        <?php
        if ($mode == "up") {
            echo _DOCTYPE_MODIFICATION;
        } else if ($mode == "add") {
            echo _ADD_DOCTYPE;
        }
        ?>
        </h1>
        <div id="inner_content" class="clearfix">
        <?php
        if ($state == false) {
            echo "<br /><br /><br /><br />" . _DOCTYPE . ' ' . _UNKOWN
                . "<br /><br /><br /><br />";
        } else {
            $arrayColl = $sec->retrieve_insert_collections();
            ?>
            <br/><br/>
            <form name="frmtype" id="frmtype" method="post" action="<?php
            echo $_SESSION['config']['businessappurl'];
            ?>index.php?page=types_up_db" class="forms">
            <input type="hidden" name="order" id="order" value="<?php
            echo $_REQUEST['order'];
            ?>" />
            <input type="hidden" name="order_field" id="order_field" value="<?php
            echo $_REQUEST['order_field'];
            ?>" />
            <input type="hidden" name="what" id="what" value="<?php
            echo $_REQUEST['what'];
            ?>" />
            <input type="hidden" name="start" id="start" value="<?php
            echo $_REQUEST['start'];
            ?>" />
            <div class="block">
                <input  type="hidden" name="mode" value="<?php echo $mode;?>" />
                <p>
                <label><?php echo _ATTACH_SUBFOLDER;?> : </label>
                <select name="sous_dossier" id="sous_dossier" class="listext" onchange="">
                    <option value=""><?php echo _CHOOSE_SUBFOLDER;?></option>
                    <?php
            for ($i = 0; $i < count($_SESSION['sous_dossiers']); $i ++) {
                ?>
                <option value="<?php
                echo $_SESSION['sous_dossiers'][$i]['ID'];
                ?>" <?php
                if (isset($_SESSION['m_admin']['doctypes']['SUB_FOLDER'])
                    && $_SESSION['sous_dossiers'][$i]['ID'] == $_SESSION['m_admin']['doctypes']['SUB_FOLDER']
                ) {
                    echo "selected=\"selected\" " ;
                }
                echo 'class="' . $_SESSION['sous_dossiers'][$i]['STYLE'] . '"';
                ?>><?php
                echo $_SESSION['sous_dossiers'][$i]['LABEL'];
                ?></option>
                <?php
            }
            ?>
            </select>
            </p>
            <p>
                <label for="collection"><?php echo _COLLECTION;?> : </label>
                <select name="collection" id="collection" onchange="get_opt_index('<?php
            echo $_SESSION['config']['businessappurl'];
            ?>index.php?display=true&page=get_index', this.options[this.options.selectedIndex].value);">
                    <option value="" ><?php echo _CHOOSE_COLLECTION;?></option>
            <?php
            for ($i = 0; $i < count($arrayColl); $i ++) {
                ?>
                <option value="<?php
                echo $arrayColl[$i]['id'];
                ?>" <?php
                if (isset($_SESSION['m_admin']['doctypes']['COLL_ID'])
                    && $_SESSION['m_admin']['doctypes']['COLL_ID'] == $arrayColl[$i]['id']
                ) {
                    echo 'selected="selected"';
                }
                ?> ><?php echo $arrayColl[$i]['label'];?></option>
                <?php
            }
             ?>
             </select>
             </p>
             <?php
            if ($mode == "up") {
                ?>
                <p>
                    <label for="id"><?php echo _ID;?> : </label>
                    <input type="text" class="readonly" name="idbis" value="<?php
                echo $id;
                ?>" readonly="readonly" />
                    <input type="hidden" name="id" value="<?php echo $id;?>" />
                </p>
                <?php
            }
            ?>
            <p>
                <label for="label"><?php echo _WORDING;?> : </label>
                <input name="label" type="text" class="textbox" id="label" value="<?php
            if (isset($_SESSION['m_admin']['doctypes']['LABEL'])) {
                echo $func->show_str($_SESSION['m_admin']['doctypes']['LABEL']);
            }
            ?>"/>
            </p>
            <?php
            $_SESSION['service_tag'] = 'frm_doctype';
            $core->execute_app_services(
                $_SESSION['app_services'], 'doctype_up', 'include'
            );
            ?>
            <div class="block_end">&nbsp;</div>
            <br/>
            <?php
            $core->execute_modules_services(
                $_SESSION['modules_services'], 'doctype_up', "include"
            );
            $_SESSION['service_tag'] = '';
            ?>
            <div id="opt_index"></div>
                <p class="buttons">
            <?php
            if ($mode == "up") {
                ?>
                <input class="button" type="submit" name="Submit" value="<?php
                echo _MODIFY_DOCTYPE;
                ?>"/>
                <?php
            } else if ($mode == "add") {
                ?>
                <input type="submit" class="button"  name="Submit" value="<?php
                echo _ADD_DOCTYPE;
                ?>" />
                <?php
            }
            ?>
            <input type="button" class="button"  name="cancel" value="<?php
            echo _CANCEL;
            ?>" onclick="javascript:window.location.href='<?php
            echo $_SESSION['config']['businessappurl'];
            ?>index.php?page=types';"/>
            </p>
            </div>
            </form>
            </div>
                <script type="text/javascript">
                var coll_list = $('collection');
                get_opt_index('<?php
            echo $_SESSION['config']['businessappurl'];
            ?>index.php?display=true&page=get_index', coll_list.options[coll_list.options.selectedIndex].value);
                </script>
                <script type="text/javascript">
            
                </script>
            <?php
         }
         ?>
        </div>
    <?php
    }

    /**
    * Checks the formtype data
    */
    private function typesinfo()
    {
        $core = new core_tools();
        $func = new functions();
        if (! isset($_REQUEST['mode'])) {
            $_SESSION['error'] = _UNKNOWN_PARAM . "<br />";
        }

        if (isset($_REQUEST['label']) && ! empty($_REQUEST['label'])) {
            $_SESSION['m_admin']['doctypes']['LABEL'] = $func->wash(
                $_REQUEST['label'], "no", _THE_WORDING, 'yes', 0, 255
            );
        } else {
            $_SESSION['error'] .= _WORDING . ' ' . _IS_EMPTY;
        }

        $_SESSION['service_tag'] = "doctype_info";
        echo $core->execute_modules_services(
            $_SESSION['modules_services'], 'doctype_info', "include"
        );
        $core->execute_app_services(
            $_SESSION['app_services'], 'doctype_up', 'include'
        );
        $_SESSION['service_tag'] = '';
        if (! isset($_REQUEST['collection']) || empty($_REQUEST['collection'])) {
            $_SESSION['error'] .= _COLLECTION . ' ' . _IS_MANDATORY . '.<br/>';
        } else {
            $_SESSION['m_admin']['doctypes']['COLL_ID'] = $_REQUEST['collection'];
            $_SESSION['m_admin']['doctypes']['indexes'] = array();
            $_SESSION['m_admin']['doctypes']['mandatory_indexes'] = array();
            if (isset($_REQUEST['fields'])) {
                for ($i = 0; $i < count($_REQUEST['fields']); $i ++) {
                    array_push(
                        $_SESSION['m_admin']['doctypes']['indexes'],
                        $_REQUEST['fields'][$i]
                    );
                }
            }
            if (isset($_REQUEST['mandatory_fields'])) {
                for ($i = 0; $i < count($_REQUEST['mandatory_fields']); $i ++) {
                    if (! in_array(
                        $_REQUEST['mandatory_fields'][$i],
                        $_SESSION['m_admin']['doctypes']['indexes']
                    )
                    ) {
                        $_SESSION['error'] .= _IF_CHECKS_MANDATORY_MUST_CHECK_USE;
                    }
                    array_push(
                        $_SESSION['m_admin']['doctypes']['mandatory_indexes'],
                        $_REQUEST['mandatory_fields'][$i]
                    );
                }
            }
        }
        if (! isset($_REQUEST['sous_dossier'])
            || empty($_REQUEST['sous_dossier'])
        ) {
            $_SESSION['error'] .= _THE_SUBFOLDER . ' ' . _IS_MANDATORY . '.<br/>';
        } else {
            $_SESSION['m_admin']['doctypes']['SUB_FOLDER'] = $func->wash(
                $_REQUEST['sous_dossier'], "no", _THE_SUBFOLDER
            );
            $this->connect();
            $this->query(
                "select doctypes_first_level_id as id from "
                . $_SESSION['tablename']['doctypes_second_level']
                . " where doctypes_second_level_id = "
                . $_REQUEST['sous_dossier']
            );
            $res = $this->fetch_object();
            $_SESSION['m_admin']['doctypes']['STRUCTURE'] = $res->id;
        }
        $_SESSION['m_admin']['doctypes']['order'] = $_REQUEST['order'];
        $_SESSION['m_admin']['doctypes']['order_field'] = $_REQUEST['order_field'];
        $_SESSION['m_admin']['doctypes']['what'] = $_REQUEST['what'];
        $_SESSION['m_admin']['doctypes']['start'] = $_REQUEST['start'];
    }

    /**
    * Modify, add or validate a doctype
    */
    public function uptypes()
    {
        // modify, add or validate a doctype
        $core = new core_tools();
        $this->typesinfo();
        $order = $_SESSION['m_admin']['doctypes']['order'];
        $orderField = $_SESSION['m_admin']['doctypes']['order_field'];
        $what = $_SESSION['m_admin']['doctypes']['what'];
        $start = $_SESSION['m_admin']['doctypes']['start'];

        if (! empty($_SESSION['error'])) {
            if ($_REQUEST['mode'] == "up") {
                if (! empty($_SESSION['m_admin']['doctypes']['TYPE_ID'])) {
                    ?><script type="text/javascript">window.top.location.href='<?php
                    echo $_SESSION['config']['businessappurl']
                        . "index.php?page=types_up&id="
                        . $_SESSION['m_admin']['doctypes']['TYPE_ID'];
                    ?>';</script>
                    <?php
                    exit();
                } else {
                    ?>
                    <script type="text/javascript">window.top.location.href='<?php
                    echo $_SESSION['config']['businessappurl']
                        . "index.php?page=types&order=" . $order
                        . "&order_field=" . $orderField . "&start="
                        . $start . "&what=" . $what;
                    ?>';</script>
                    <?php
                    exit();
                }
            } else if ($_REQUEST['mode'] == "add") {
                ?> <script type="text/javascript">window.top.location.href='<?php
                echo $_SESSION['config']['businessappurl']
                    . "index.php?page=types_add";
                ?>';</script>
                <?php
                exit();
            }
        } else {
            $this->connect();
            if ($_REQUEST['mode'] <> "prop" && $_REQUEST['mode'] <> "add") {
                $this->query(
                    "update " . DOCTYPES_TABLE . " set description = '"
                    . $this->protect_string_db(
                        $_SESSION['m_admin']['doctypes']['LABEL']
                    ) . "' , doctypes_first_level_id = "
                    . $_SESSION['m_admin']['doctypes']['STRUCTURE']
                    . ", doctypes_second_level_id = "
                    . $_SESSION['m_admin']['doctypes']['SUB_FOLDER']
                    . ", enabled = 'Y', coll_id = '"
                    . $this->protect_string_db(
                        $_SESSION['m_admin']['doctypes']['COLL_ID']
                    ) . "' where type_id = "
                    . $_SESSION['m_admin']['doctypes']['TYPE_ID'] . ""
                );

                $this->query(
                    "delete from " . DOCTYPES_INDEXES_TABLE . " where coll_id = '"
                    . $this->protect_string_db(
                        $_SESSION['m_admin']['doctypes']['COLL_ID']
                    ) . "' and type_id = "
                    . $_SESSION['m_admin']['doctypes']['TYPE_ID']
                );
                //$this->show();

                for ($i = 0; $i < count(
                    $_SESSION['m_admin']['doctypes']['indexes']
                ); $i ++
                ) {
                    $mandatory = 'N';
                    if (in_array(
                        $_SESSION['m_admin']['doctypes']['indexes'][$i],
                        $_SESSION['m_admin']['doctypes']['mandatory_indexes']
                    )
                    ) {
                        $mandatory = 'Y';
                    }
                    $this->query(
                        "insert into " . DOCTYPES_INDEXES_TABLE
                        . " (coll_id, type_id, field_name, mandatory) values('"
                        . $this->protect_string_db(
                            $_SESSION['m_admin']['doctypes']['COLL_ID']
                        ) . "', " . $_SESSION['m_admin']['doctypes']['TYPE_ID']
                        . ", '" . $_SESSION['m_admin']['doctypes']['indexes'][$i]
                        . "', '" . $mandatory . "')"
                    );
                }
                $_SESSION['service_tag'] = "doctype_updatedb";
                $core->execute_modules_services(
                    $_SESSION['modules_services'], 'doctype_load_db', "include"
                );
                $core->execute_app_services(
                    $_SESSION['app_services'], 'doctype_up', 'include'
                );
                $_SESSION['service_tag'] = '';
                if ($_REQUEST['mode'] == "up") {
                    $_SESSION['error'] = _DOCTYPE_MODIFICATION;
                    if ($_SESSION['history']['doctypesup'] == "true") {
                        $hist = new history();
                        $hist->add(
                            DOCTYPES_TABLE,
                            $_SESSION['m_admin']['doctypes']['TYPE_ID'], "UP",'doctypesup',
                            _DOCTYPE_MODIFICATION . " : "
                            . $_SESSION['m_admin']['doctypes']['LABEL'],
                            $_SESSION['config']['databasetype']
                        );
                    }
                }
                $this->cleartypeinfos();
                ?>
                <script type="text/javascript">window.top.location.href='<?php
                echo $_SESSION['config']['businessappurl']
                    . "index.php?page=types&order=" . $order . "&order_field="
                    . $orderField . "&start=" . $start . "&what=" . $what;
                ?>';</script>
                <?php
                exit();
            } else {
                $hist = new history();
                if ($_REQUEST['mode'] == "add") {
                    $tmp = $this->protect_string_db(
                        $_SESSION['m_admin']['doctypes']['LABEL']
                    );
                    $this->query(
                        "insert into " . DOCTYPES_TABLE . " (coll_id, "
                        ." description, doctypes_first_level_id, "
                        . "doctypes_second_level_id,  enabled ) VALUES ('"
                        . $_SESSION['m_admin']['doctypes']['COLL_ID'] . "', '"
                        . $tmp . "',"
                        . $_SESSION['m_admin']['doctypes']['STRUCTURE'] . ","
                        . $_SESSION['m_admin']['doctypes']['SUB_FOLDER']
                        . ", 'Y' )"
                    );
                    //$this->show();
                    $this->query(
                        "select type_id from " . DOCTYPES_TABLE
                        . " where coll_id = '"
                        . $_SESSION['m_admin']['doctypes']['COLL_ID']
                        . "' and description = '" . $tmp
                        . "' and doctypes_first_level_id = "
                        . $_SESSION['m_admin']['doctypes']['STRUCTURE']
                        . " and doctypes_second_level_id = "
                        . $_SESSION['m_admin']['doctypes']['SUB_FOLDER']
                    );
                    //$this->show();
                    $res = $this->fetch_object();
                    $_SESSION['m_admin']['doctypes']['TYPE_ID'] = $res->type_id;
                    for ($i = 0; $i < count(
                        $_SESSION['m_admin']['doctypes']['indexes']
                    ); $i ++
                    ) {
                        $mandatory = 'N';
                        if (in_array(
                            $_SESSION['m_admin']['doctypes']['indexes'][$i],
                            $_SESSION['m_admin']['doctypes']['mandatory_indexes']
                        )
                        ) {
                            $mandatory = 'Y';
                        }
                        $this->query(
                            "insert into " . DOCTYPES_INDEXES_TABLE
                            . " (coll_id, type_id, field_name, mandatory) "
                            . "values('" . $this->protect_string_db(
                                $_SESSION['m_admin']['doctypes']['COLL_ID']
                            ) . "', " . $_SESSION['m_admin']['doctypes']['TYPE_ID']
                            . ", '" . $_SESSION['m_admin']['doctypes']['indexes'][$i]
                            . "', '" . $mandatory . "')"
                        );
                    }

                    $_SESSION['service_tag'] = "doctype_insertdb";
                    echo $core->execute_modules_services(
                        $_SESSION['modules_services'], 'doctype_load_db', "include"
                    );
                    $core->execute_app_services(
                        $_SESSION['app_services'], 'doctype_up', 'include'
                    );
                    $_SESSION['service_tag'] = '';

                    if ($_SESSION['history']['doctypesadd'] == "true") {
                        $hist->add(
                            DOCTYPES_TABLE, $res->type_id, "ADD", 'doctypesadd', _DOCTYPE_ADDED
                            . " : " . $_SESSION['m_admin']['doctypes']['LABEL'],
                            $_SESSION['config']['databasetype']
                        );
                    }
                }
                $this->cleartypeinfos();

                ?> <script  type="text/javascript">window.top.location.href='<?php
                echo $_SESSION['config']['businessappurl']
                    . "index.php?page=types&order=" . $order . "&order_field="
                    . $orderField . "&start=" . $start . "&what=" . $what;
                ?>';</script>
                <?php
                exit();
            }
        }
    }

    /**
    * Clear the session variable for the doctypes
    */
    private function cleartypeinfos()
    {
        // clear the session variable for the doctypes
        unset($_SESSION['m_admin']);
    }


    /**
    * Return in an array all enabled doctypes for a given collection
    *
    * @param string $collId Collection identifier
    */
    public function getArrayTypes($collId)
    {
        $types = array();
        if (empty($collId)) {
            return $types;
        }

        $this->connect();
        $this->query(
            "select type_id, description from " . DOCTYPES_TABLE
            . " where coll_id = '" . $collId . "' and enabled = 'Y' "
            . "order by description"
        );
        while ($res = $this->fetch_object()) {
            array_push(
                $types,
                array(
                    'ID' => $res->type_id,
                    'LABEL' => $this->show_string($res->description),
                )
            );
        }
        return $types;
    }


    /**
    * Return architecture for one doctype
    *
    * @param string $doctype
    */
    public function GetFullStructure($doctype)
    {
        $structure = array();
        $levelQuery = "select doctypes_first_level_id, "
            . "doctypes_second_level_id from " . DOCTYPES_TABLE
            . " where type_id = '" . $doctype . "'";
        $this->connect();
        $this->query($levelQuery);
        $result = $this->fetch_object();
        if ($this->nb_result() == 0) {
            return false;
        } else {
            array_push(
                $structure,
                array(
                    "doctype" => $doctype,
                    "first_level" => $result->doctypes_first_level_id,
                    "second_level" => $result->doctypes_second_level_id
                )
            );
            return $structure;
        }
    }

    /**
    * Return in an array all enabled doctypes_second_level
    *
    * @param string
    */
    public function getArrayDoctypesSecondLevel()
    {
        $secondLevel = array();
        $this->connect();
        $this->query(
            "select doctypes_second_level_id, doctypes_second_level_label, "
            . "css_style from "
            . $_SESSION['tablename']['doctypes_second_level']
            . " where enabled = 'Y' order by doctypes_second_level_label"
        );
        while ($res = $this->fetch_object()) {
            array_push(
                $secondLevel,
                array(
                    'ID' => $res->doctypes_second_level_id,
                    'LABEL' => $this->show_string($res->doctypes_second_level_label),
                    'STYLE' => $res->css_style,
                )
            );
        }
        return $secondLevel;
    }
    /**
    * Returns in an array all enabled doctypes for a given collection with the
    * structure
    *
    * @param string $collId Collection identifier
    */
    public function getArrayStructTypes($collId)
    {
        $this->connect();
        $level1 = array();
        $this->query(
            "select d.type_id, d.description, d.doctypes_first_level_id, "
            . "d.doctypes_second_level_id, dsl.doctypes_second_level_label, "
            . "dfl.doctypes_first_level_label, dfl.css_style as style_level1, "
            . " dsl.css_style as style_level2 from " . DOCTYPES_TABLE . " d, "
            . $_SESSION['tablename']['doctypes_second_level'] . " dsl, "
            . $_SESSION['tablename']['doctypes_first_level']
            . " dfl where coll_id = '" . $collId . "' and d.enabled = 'Y' "
            . "and d.doctypes_second_level_id = dsl.doctypes_second_level_id "
            . "and d.doctypes_first_level_id = dfl.doctypes_first_level_id "
            . "and dsl.enabled = 'Y' and dfl.enabled = 'Y' "
            . "order by dfl.doctypes_first_level_label,"
            . "dsl.doctypes_second_level_label, d.description "
        );
        $lastLevel1 = '';
        $nbLevel1 = 0;
        $lastLevel2 = '';
        $nbLevel2 = 0;
        while ($res = $this->fetch_object()) {
            //var_dump($res);
            if ($lastLevel1 <> $res->doctypes_first_level_id) {
                array_push(
                    $level1,
                    array(
                        'id' => $res->doctypes_first_level_id,
                        'label' => $this->show_string($res->doctypes_first_level_label),
                        'style' => $res->style_level1,
                        'level2' => array(
                            array(
                                'id' => $res->doctypes_second_level_id,
                                'label' => $this->show_string($res->doctypes_second_level_label),
                                'style' => $res->style_level2,
                                'types' => array(
                                    array(
                                        'id' => $res->type_id,
                                        'label' => $this->show_string($res->description)
                                    )
                                )
                            )
                        )
                    )
                );
                $lastLevel1 = $res->doctypes_first_level_id;
                $nbLevel1 ++;
                $lastLevel2 = $res->doctypes_second_level_id;
                $nbLevel2 = 1;
            } else if ($lastLevel2 <> $res->doctypes_second_level_id) {
                array_push(
                    $level1[$nbLevel1 - 1]['level2'],
                    array(
                        'id' => $res->doctypes_second_level_id,
                        'label' => $this->show_string($res->doctypes_second_level_label),
                        'style' => $res->style_level2,
                        'types' => array(
                            array(
                                'id' => $res->type_id,
                                'label' => $this->show_string($res->description)
                            )
                        )
                    )
                );
                $lastLevel2 = $res->doctypes_second_level_id;
                $nbLevel2 ++;
            } else {
                array_push(
                    $level1[$nbLevel1 - 1]['level2'][$nbLevel2 - 1]['types'],
                    array(
                        'id' => $res->type_id,
                        'label' => $this->show_string($res->description)
                    )
                );
            }
            //$this->show_array($level1);
        }
        return $level1;
    }

    /**
    * Returns in an array all indexes possible for a given collection
    *
    * @param string $collId Collection identifier
    * @return array $indexes[$i]
    *                   ['column'] : database field of the index
    *                   ['label'] : Index label
    *                   ['type'] : Index type ('date', 'string', 'integer' or 'float')
    *                   ['img'] : url to the image index
    */
    public function get_all_indexes($collId)
    {
        $sec = new security();
        $indColl = $sec->get_ind_collection($collId);
        if (file_exists(
            $_SESSION['config']['corepath'] . 'custom' . DIRECTORY_SEPARATOR
            . $_SESSION['custom_override_id'] . DIRECTORY_SEPARATOR . 'apps'
            . DIRECTORY_SEPARATOR . $_SESSION['config']['app_id']
            . DIRECTORY_SEPARATOR . "xml" . DIRECTORY_SEPARATOR
            . $_SESSION['collections'][$indColl]['index_file']
        )
        ) {
            $path = $_SESSION['config']['corepath'] . 'custom'
                  . DIRECTORY_SEPARATOR . $_SESSION['custom_override_id']
                  . DIRECTORY_SEPARATOR . 'apps' . DIRECTORY_SEPARATOR
                  . $_SESSION['config']['app_id'] . DIRECTORY_SEPARATOR . "xml"
                  . DIRECTORY_SEPARATOR
                  . $_SESSION['collections'][$indColl]['index_file'];
        } else {
            $path = 'apps' . DIRECTORY_SEPARATOR . $_SESSION['config']['app_id']
                  . DIRECTORY_SEPARATOR . "xml" . DIRECTORY_SEPARATOR
                  . $_SESSION['collections'][$indColl]['index_file'];
        }

        $xmlfile = simplexml_load_file($path);

        $pathLang = 'apps' . DIRECTORY_SEPARATOR . $_SESSION['config']['app_id']
                  . DIRECTORY_SEPARATOR . 'lang' . DIRECTORY_SEPARATOR
                  . $_SESSION['config']['lang'] . '.php';
        $indexes = array();
        foreach ($xmlfile->INDEX as $item) {
            $label = (string) $item->label;
            if (!empty($label) && defined($label) && constant($label) <> NULL) {
                $label = constant($label);
            }
            $img = (string) $item->img;
            if (isset($item->default_value) && ! empty($item->default_value)) {
                $default = (string) $item->default_value;
                if (!empty($default) && defined($default) 
                    && constant($default) <> NULL
                ) {
                    $default = constant($default);
                }
            } else {
                $default = false;
            }
            if (isset($item->values_list)) {
                $values = array();
                $list = $item->values_list ;
                foreach ($list->value as $val) {
                    $labelVal = (string) $val->label;
                    if (!empty($labelVal) && defined($labelVal) 
                        && constant($labelVal) <> NULL
                    ) {
                        $labelVal = constant($labelVal);
                    }
                   
                    array_push(
                        $values,
                        array(
                            'id' => (string) $val->id,
                            'label' => $labelVal,
                        )
                    );
                }
                $tmpArr = array(
                    'column' => (string) $item->column,
                    'label' => $label,
                    'type' => (string) $item->type,
                    'img' => $img,
                    'type_field' => 'select',
                    'values' => $values,
                    'default_value' => $default
                );
            } else if (isset($item->table)) {
                $values = array();
                $tableXml = $item->table;
                //$this->show_array($tableXml);
                $tableName = (string) $tableXml->table_name;
                $foreignKey = (string) $tableXml->foreign_key;
                $foreignLabel = (string) $tableXml->foreign_label;
                $whereClause = (string) $tableXml->where_clause;
                $order = (string) $tableXml->order;
                $query = "select " . $foreignKey . ", " . $foreignLabel
                       . " from " . $tableName;
                if (isset($whereClause) && ! empty($whereClause)) {
                    $query .= " where " . $whereClause;
                }
                if (isset($order) && ! empty($order)) {
                    $query .= ' '.$order;
                }
                $this->connect();
                $this->query($query);
                while ($res = $this->fetch_array()) {
                     array_push(
                         $values,
                         array(
                             'id' => (string) $res[0],
                             'label' => (string) $res[1],
                         )
                     );
                }
                $tmpArr = array(
                    'column' => (string) $item->column,
                    'label' => $label,
                    'type' => (string) $item->type,
                    'img' => $img,
                    'type_field' => 'select',
                    'values' => $values,
                    'default_value' => $default,
                );
            } else {
                $tmpArr = array(
                    'column' => (string) $item->column,
                    'label' => $label,
                    'type' => (string) $item->type,
                    'img' => $img,
                    'type_field' => 'input',
                    'default_value' => $default,
                );
            }
            //$this->show_array($tmpArr);
            array_push($indexes, $tmpArr);
        }
        return $indexes;
    }

    /**
    * Returns in an array all indexes for a doctype
    *
    * @param string $typeId Document type identifier
    * @param string $collId Collection identifier
    * @param string $mode Mode 'full' or 'minimal', 'full' by default
    * @return array array of the indexes, depends on the chosen mode :
    *       1) mode = 'full' : $indexes[field_name] :  the key is the field name in the database
    *                                       ['label'] : Index label
    *                                       ['type'] : Index type ('date', 'string', 'integer' or 'float')
    *                                       ['img'] : url to the image index
    *       2) mode = 'minimal' : $indexes[$i] = field name in the database
    */
    public function get_indexes($typeId, $collId, $mode='full')
    {
        $fields = array();
        $this->connect();
        $this->query(
            "select field_name from " . DOCTYPES_INDEXES_TABLE
            . " where coll_id = '" . $collId . "' and type_id = " . $typeId
        );
        //$this->show();

        while ($res = $this->fetch_object()) {
            array_push($fields, $res->field_name);
        }
        if ($mode == 'minimal') {
            return $fields;
        }

        $indexes = array();
        $sec = new security();
        $indColl = $sec->get_ind_collection($collId);
        if (file_exists(
            $_SESSION['config']['corepath'] . 'custom' . DIRECTORY_SEPARATOR
            . $_SESSION['custom_override_id'] . DIRECTORY_SEPARATOR . 'apps'
            . DIRECTORY_SEPARATOR . $_SESSION['config']['app_id']
            . DIRECTORY_SEPARATOR . "xml" . DIRECTORY_SEPARATOR
            . $_SESSION['collections'][$indColl]['index_file']
        )
        ) {
            $path = $_SESSION['config']['corepath'] . 'custom'
                  . DIRECTORY_SEPARATOR . $_SESSION['custom_override_id']
                  . DIRECTORY_SEPARATOR . 'apps' . DIRECTORY_SEPARATOR
                  . $_SESSION['config']['app_id'] . DIRECTORY_SEPARATOR
                  . "xml" . DIRECTORY_SEPARATOR
                  . $_SESSION['collections'][$indColl]['index_file'];
        } else {
            $path = 'apps' . DIRECTORY_SEPARATOR . $_SESSION['config']['app_id']
                  . DIRECTORY_SEPARATOR . "xml" . DIRECTORY_SEPARATOR
                  . $_SESSION['collections'][$indColl]['index_file'];
        }

        $xmlfile = simplexml_load_file($path);
        $pathLang = 'apps' . DIRECTORY_SEPARATOR . $_SESSION['config']['app_id']
                  . DIRECTORY_SEPARATOR . 'lang' . DIRECTORY_SEPARATOR
                  . $_SESSION['config']['lang'] . '.php';
        foreach ($xmlfile->INDEX as $item) {
            $label = (string) $item->label;
            if (!empty($label) && defined($label) 
                && constant($label) <> NULL
            ) {
                $label = constant($label);
            }
           
            $col = (string) $item->column;
            $img = (string) $item->img;
            if (isset($item->default_value) && ! empty($item->default_value)) {
                $default = (string) $item->default_value;
                if (!empty($default) && defined($default) 
                    && constant($default) <> NULL
                ) {
                    $default = constant($default);
                }
            } else {
                $default = false;
            }
            if (in_array($col, $fields)) {
                if (isset($item->values_list)) {
                    $values = array();
                    $list = $item->values_list ;
                    foreach ($list->value as $val) {
                        $labelVal = (string) $val->label;
                        if (!empty($labelVal) && defined($labelVal) 
                            && constant($labelVal) <> NULL
                        ) {
                            $labelVal = constant($labelVal);
                        }
                       
                        array_push(
                            $values,
                            array(
                                'id' => (string) $val->id,
                                'label' => $labelVal,
                            )
                        );
                    }
                    $indexes[$col] = array(
                        'label' => $label,
                        'type' => (string) $item->type,
                        'img' => $img,
                        'type_field' => 'select',
                        'values' => $values,
                        'default_value' => $default,
						'origin' => 'document'
                    );
                } else if (isset($item->table)) {
                    $values = array();
                    $tableXml = $item->table;
                    //$this->show_array($tableXml);
                    $tableName = (string) $tableXml->table_name;
                    $foreignKey = (string) $tableXml->foreign_key;
                    $foreignLabel = (string) $tableXml->foreign_label;
                    $whereClause = (string) $tableXml->where_clause;
                    $order = (string) $tableXml->order;
                    $query = "select " . $foreignKey . ", " . $foreignLabel
                           . " from " . $tableName;
                    if (isset($whereClause) && ! empty($whereClause)) {
                        $query .= " where " . $whereClause;
                    }
                    if (isset($order) && ! empty($order)) {
                        $query .= ' '.$order;
                    }
                    $this->connect();
                    $this->query($query);
                    while ($res = $this->fetch_object()) {
                         array_push(
                             $values,
                             array(
                                 'id' => (string) $res->$foreignKey,
                                 'label' => $res->$foreignLabel,
                             )
                         );
                    }
                    $indexes[$col] = array(
                        'label' => $label,
                        'type' => (string) $item->type,
                        'img' => $img,
                        'type_field' => 'select',
                        'values' => $values,
                        'default_value' => $default,
						'origin' => 'document'
                    );
                } else {
                    $indexes[$col] = array(
                        'label' => $label,
                        'type' => (string) $item->type,
                        'img' => $img,
                        'type_field' => 'input',
                        'default_value' => $default,
						'origin' => 'document'
                    );
                }
            }
        }
        return $indexes;
    }

    /**
    * Returns in an array all manadatory indexes possible for a given type
    *
    * @param string $typeId Document type identifier
    * @param string $collId Collection identifier
    * @return array Array of the manadatory indexes, $indexes[$i] = field name
    * in the db
    */
    public function get_mandatory_indexes($typeId, $collId)
    {
        $fields = array();
        $this->connect();
        $this->query(
            "select field_name from " . DOCTYPES_INDEXES_TABLE
            . " where coll_id = '" . $collId . "' and type_id = " . $typeId
            . " and mandatory = 'Y'"
        );

        while ($res = $this->fetch_object()) {
            array_push($fields, $res->field_name);
        }
        return $fields;
    }

    /**
    * Checks validity of indexes
    *
    * @param string $typeId Document type identifier
    * @param string $collId Collection identifier
    * @param array $values Values to check
    * @return bool true if checks is ok, false if an error occurs
    */
    public function check_indexes($typeId, $collId, $values)
    {
        $sec = new security();
        $indColl = $sec->get_ind_collection($collId);
        $indexes = $this->get_indexes($typeId, $collId);
        $mandatoryIndexes = $this->get_mandatory_indexes($typeId, $collId);

        // Checks the manadatory indexes
        for ($i = 0; $i < count($mandatoryIndexes); $i ++) {
            if ((empty($values[$mandatoryIndexes[$i]])
                || $values[$mandatoryIndexes[$i]] == '')
            ) {
                $_SESSION['error'] .= $indexes[$mandatoryIndexes[$i]]['label']
                                   . ' <br/>' . _IS_EMPTY . '<br/>';
            }
        }

        // Checks type indexes
        $datePattern = "/^[0-3][0-9]-[0-1][0-9]-[1-2][0-9][0-9][0-9]$/";
        foreach (array_keys($values) as $key) {
            if ($indexes[$key]['type'] == 'date' && ! empty($values[$key])) {
                if (preg_match($datePattern, $values[$key]) == 0) {
                    $_SESSION['error'] .= $indexes[$key]['label'] . " <br/>"
                                       . _WRONG_FORMAT . ".<br/>";
                    return false;
                }
            } elseif ($indexes[$key]['type'] == 'string'
                && trim($values[$key]) <> ''
            ) {
                $fieldValue = $this->wash(
                    $values[$key], "no", $indexes[$key]['label']
                );
            } elseif ($indexes[$key]['type'] == 'float'
                && preg_match("/^[0-9.]+$/", $values[$key]) == 1
            ) {
                $fieldValue = $this->wash(
                    $values[$key], "float", $indexes[$key]['label']
                );
            } elseif ($indexes[$key]['type'] == 'integer'
                && preg_match("/^[0-9]+$/", $values[$key]) == 1
            ) {
                $fieldValue = $this->wash(
                    $values[$key], "num", $indexes[$key]['label']
                );
            } elseif (!empty($values[$key])) {
                $_SESSION['error'] .= $indexes[$key]['label'] . " <br/>"
                                       . _WRONG_FORMAT . ".<br/>";
                return false;
            }

            if (isset($indexes[$key]['values'])
                && count($indexes[$key]['values']) > 0
            ) {
                $found = false;
                for ($i = 0; $i < count($indexes[$key]['values']); $i++ ) {
                    if ($values[$key] == $indexes[$key]['values'][$i]['id']) {
                        $found = true;
                        break;
                    }
                }
                if (! $found && $values[$key] <> "") {
                    $_SESSION['error'] .= $indexes[$key]['label'] . " <br/>: "
                                       . _ITEM_NOT_IN_LIST . ".<br/>";
                    return false;
                }
            }
        }
        if (! empty($_SESSION['error'])) {
            return false;
        } else {
            return true;
        }
    }


    /**
    * Returns a string to use in an sql update query
    *
    * @param string $typeId Document type identifier
    * @param string $collId Collection identifier
    * @param array $values Values to update
    * @return string Part of the update sql query
    */
    public function get_sql_update($typeId, $collId, $values)
    {
        $indexes = $this->get_indexes($typeId, $collId);

        $req = '';
        foreach (array_keys($values)as $key) {
            if ($indexes[$key]['type'] == 'date' && ! empty($values[$key])) {
                $req .= ", " . $key . " = '"
                     . $this->format_date_db($values[$key]) . "'";
            } else if ($indexes[$key]['type'] == 'string'
                && ! empty($values[$key])
            ) {
                $req .= ", " . $key . " = '"
                     . $this->protect_string_db($values[$key]) . "'";
            } else if ($indexes[$key]['type'] == 'float'
                && ! empty($values[$key])
            ) {
                $req .= ", " . $key . " = " . $values[$key] . "";
            } else if ($indexes[$key]['type'] == 'integer'
                && ! empty($values[$key])
            ) {
                $req .= ", " . $key . " = " . $values[$key] . "";
            }
        }
        return $req;
    }

    /**
    * Returns an array used to insert data in the database
    *
    * @param string $typeId Document type identifier
    * @param string $collId Collection identifier
    * @param array $values Values to update
    * @param array $data Return array
    * @return array
    */
    public function fill_data_array($typeId, $collId, $values, $data = array())
    {
        $indexes = $this->get_indexes($typeId, $collId);

        foreach (array_keys($values) as $key) {
            if ($indexes[$key]['type'] == 'date' && ! empty($values[$key])) {
                array_push(
                    $data,
                    array(
                        'column' => $key,
                        'value' => $this->format_date_db($values[$key]),
                        'type' => "date",
                    )
                );
            } else if ($indexes[$key]['type'] == 'string'
                && trim($values[$key]) <> ''
            ) {
                array_push(
                    $data,
                    array(
                        'column' => $key,
                        'value' => $this->protect_string_db($values[$key]),
                        'type' => "string",
                    )
                );
            } else if ($indexes[$key]['type'] == 'float'
                && preg_match("/^[0-9.]+$/", $values[$key]) == 1
            ) {
                array_push(
                    $data,
                    array(
                        'column' => $key,
                        'value' => $values[$key],
                        'type' => "float",
                    )
                );
            } else if ($indexes[$key]['type'] == 'integer'
                && preg_match("/^[0-9]+$/", $values[$key]) == 1
            ) {
                array_push(
                    $data,
                    array(
                        'column' => $key,
                        'value' => $values[$key],
                        'type' => "integer",
                    )
                );
            }
        }
        return $data;
    }

    /**
    * Inits in the database the indexes for a given res id to null
    *
    * @param string $collId Collection identifier
    * @param string $resId Resource identifier
    */
    public function inits_opt_indexes($collId, $resId)
    {
        $sec = new security();
        $table = $sec->retrieve_table_from_coll($collId);

        $indexes = $this->get_all_indexes($collId);
        if (count($indexes) > 0) {
            $query = "update " . $table . " set ";
            for ($i = 0; $i < count($indexes); $i ++) {
                $query .= $indexes[$i]['column'] . " = NULL, ";
            }
            $query = preg_replace('/, $/', ' where res_id = ' . $resId, $query);
            $this->connect();
            $this->query($query);
        }
    }


    /**
    * Makes the search checks for a given index, and builds the where query and
    *  json
    *
    * @param array $indexes Array of the possible indexes (used to check)
    * @param string $fieldName Field name, index identifier
    * @param string $val Value to check
    * @return array ['json_txt'] : json used in the search
    *               ['where'] : where query
    */
    public function search_checks($indexes, $fieldName, $val )
    {
        $func = new functions();
        $whereRequest = '';
        $jsonTxt = '';
        if (! empty($val)) {
            $datePattern = "/^[0-3][0-9]-[0-1][0-9]-[1-2][0-9][0-9][0-9]$/";
            for ($j = 0; $j < count($indexes); $j ++) {
                $column = $indexes[$j]['column'] ;
                if (preg_match('/^doc_/', $fieldName)) {
                    $column = 'doc_' . $column;
                }
                // type == 'string'
                if ($indexes[$j]['column'] == $fieldName
                    || 'doc_' . $indexes[$j]['column'] == $fieldName
                ) {
                    $jsonTxt .= " '" . $fieldName . "' : ['"
                             . addslashes(trim($val)) . "'],";
					$whereRequest .= " lower(" . $column . ") like lower('%"
                                      . $this->protect_string_db($val) . "%') and ";
                    break;
                } else if (($indexes[$j]['column'] . '_from' == $fieldName
                    || $indexes[$j]['column'] . '_to' == $fieldName
                    || 'doc_' . $indexes[$j]['column'] . '_from' == $fieldName
                    || 'doc_' . $indexes[$j]['column'] . '_to' == $fieldName)
                        && ! empty($val)
                ) { // type == 'date'
                    if (preg_match($datePattern, $val) == false) {
                        $_SESSION['error'] .= _WRONG_DATE_FORMAT . ' : ' . $val;
                    } else {
                        if ($indexes[$j]['column'] . '_from' == $fieldName
                            || 'doc_' . $indexes[$j]['column'] . '_from' == $fieldName
                        ) {
                            $whereRequest .= " (" . $column . " >= '"
                                          . $this->format_date_db($val) . "') and ";
                        } else {
                            $whereRequest .= " (" . $column . " <= '"
                                          . $this->format_date_db($val) . "') and ";
                        }
                        $jsonTxt .= " '" . $fieldName . "' : ['" . trim($val)
                                 . "'],";
                    }
                    break;
                } else if ($indexes[$j]['column'] . '_min' == $fieldName
                    || 'doc_' . $indexes[$j]['column'] . '_min' == $fieldName
                ) {
                    if ($indexes[$j]['type'] == 'integer'
                        || $indexes[$j]['type'] == 'float'
                    ) {
                        if ($indexes[$j]['type'] == 'integer') {
                            $valCheck = $func->wash(
                                $val, "num", $indexes[$j]['label'], "no"
                            );
                        } else {
                            $valCheck = $func->wash(
                                $val, "float", $indexes[$j]['label'], "no"
                            );
                        }
                        if (empty($_SESSION['error'])) {
                            $whereRequest .= " (" . $column . " >= " . $valCheck
                                          . ") and ";
                            $jsonTxt .= " '" . $fieldName . "' : ['" . $valCheck
                                     . "'],";
                        }
                    }
                    break;
                } else if ($indexes[$j]['column'] . '_max' == $fieldName
                    || 'doc_' . $indexes[$j]['column'] . '_max' == $fieldName
                ) {
                    if ($indexes[$j]['type'] == 'integer'
                        || $indexes[$j]['type'] == 'float'
                    ) {
                        if ($indexes[$j]['type'] == 'integer') {
                            $valCheck = $func->wash(
                                $val, "num", $indexes[$j]['label'], "no"
                            );
                        } else {
                            $valCheck = $func->wash(
                                $val, "float", $indexes[$j]['label'], "no"
                            );
                        }
                        if (empty($_SESSION['error'])) {
                            $whereRequest .= " (" . $column . " <= " . $valCheck
                                          . ") and ";
                            $jsonTxt .= " '" . $fieldName . "' : ['" . $valCheck
                                     . "'],";
                        }
                    }
                    break;
                }
            }
        }
        return array(
            'json_txt' => $jsonTxt,
            'where' => $whereRequest,
        );
    }
}
