<?php
/*
*
*    Copyright 2008,2009 Maarch
*
*  This file is part of Maarch Framework.
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
*    along with Maarch Framework.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
* @brief   Form to add or remove group from a basket
*
* @file
* @author Claire Figueras <dev@maarch.org>
* @date $date$
* @version $Revision$
* @ingroup basket
*/

include('core/init.php');

require_once("core/class/class_functions.php");
require_once("core/class/class_core_tools.php");

$core_tools = new core_tools();
$core_tools->load_lang();
if(isset($_REQUEST['remove']))
{
	if(count($_REQUEST['groupes']) > 0)
	{
		$indices = array();
		for($i=0; $i < count($_REQUEST['groupes']); $i++)
		{
			for($j=0; $j < count($_SESSION['m_admin']['basket']['groups']); $j++)
			{

				if($_SESSION['m_admin']['basket']['groups'][$j]['GROUP_ID'] == $_REQUEST['groupes'][$i])
				{
					array_push($indices, $j);
				}
			}
		}

		for($i=0; $i < count($indices); $i++)
		{
			unset($_SESSION['m_admin']['basket']['groups'][$indices[$i]]);
		}
		$_SESSION['m_admin']['basket']['groups'] = array_values($_SESSION['m_admin']['basket']['groups']);
		$_SESSION['m_admin']['load_groupbasket'] = false;
	}
	$_SESSION['m_admin']['load_groupbasket'] = false;
}
$core_tools->load_html();
$core_tools->load_header();
 ?>
<body id="iframe" bgcolor="#deedf3">
	<div align="center">
	<form name="manage_groupbasket" id="manage_groupbasket" method="get" action="groupbasket_form.php">
	<?php
	if(count($_SESSION['groups']) > count($_SESSION['m_admin']['basket']['groups']))
	{
		?>
		<input type="button" class="button" name="popuplink" id="popuplink" onclick="window.open('groupbasket_popup.php', 'groupe','toolbar=no,status=yes,width=800,height=720,left=200,top=150,scrollbars=yes,top=no,location=no,resize=yes,menubar=no');" value="<?php echo _ADD_GROUP; ?>"/>
		<?php
	}
	?>
	<br/><br/>
	<h3 class="sstit"><?php echo _ASSOCIATED_GROUP;?> :</h3>
	<?php
	//$core_tools->show_array($_SESSION['m_admin']['basket']['groups']);
	if(count($_SESSION['m_admin']['basket']['groups']) > 0)
	{
		$_SESSION['m_admin']['basket']['groups'] = array_values($_SESSION['m_admin']['basket']['groups']);
		?>
		<ul>
		<?php
		for($i=0; $i < count($_SESSION['m_admin']['basket']['groups']); $i++)
		{?>
			<li><input type="checkbox" class="check" name="groupes[]" value="<?php echo $_SESSION['m_admin']['basket']['groups'][$i]['GROUP_ID']; ?>" class="check" />&nbsp;&nbsp;&nbsp;<a href="javascript://"  onclick="window.open('groupbasket_popup.php?id=<?php echo $_SESSION['m_admin']['basket']['groups'][$i]['GROUP_ID']; ?>', 'groupe','toolbar=no,status=yes,width=800,height=720,left=200,top=150,scrollbars=yes,top=no,location=no,resize=yes,menubar=no');"><?php echo $_SESSION['m_admin']['basket']['groups'][$i]['GROUP_LABEL']; ?></a>
			</li>
		<?php }?>
		</ul>
		<br/><br/>
		<input type="submit" name="remove" id="remove" value="<?php echo _DEL_GROUPS;?>" class="button" />
		<?php
	}
	else
	{
		?>
		<div >&nbsp;&nbsp;&nbsp;<i><?php echo _BASKET_NOT_USABLE;?></i></div>
		<?php
	}
	?>
	</form>
</body>
</html>
