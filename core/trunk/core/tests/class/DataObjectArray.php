<?php

class DataObjectArray 
    extends ArrayObject
{
    private $name;
    private $label;
    private $comment;
    private $schemaPath;
    private $parentObject;
    
    public function DataObjectArray($name, $schemaPath, $label=false, $comment=false) 
    {
        $this->name = $name;
        $this->schemaPath = $schemaPath;
        $this->label = $label;
        $this->comment = $comment;
        
        $this->setFlags(ArrayObject::ARRAY_AS_PROPS);
        $this->setFlags(ArrayObject::STD_PROP_LIST);
    }
    
    public function getSchemaPath() 
    {
        return $this->schemaPath;
    }
    
    public function getParentObject() 
    {
        return $this->parentObject;
    }
    
    public function setParentObject($parentObject) 
    {
        $this->parentObject = $parentObject;
    }
    
    public function append($childObject) 
    {
        $this->offsetSet(null, $childObject);
        $childObject->setParentObject($this->parentObject);
    }
    
    public function __get($name) {
        if($name === 'isDataObjectArray') {
            return true;
        }
        if($name === 'name') {
            return $this->name;
        }
        if($name === 'label') {
            if($this->label) {
                return $this->label;
            } else {
                return $this->name;
            }
        }       
        if($name === 'comment') {
            return $this->comment;
        }
    }
    
    public function getChildren() 
    {
        $return = array();
        for($i=0; $i<count($this->storage); $i++) {
            $child = $this->storage[$i];
            if(is_object($child) && ($child->isDataObject || $child->isDataObjectArray)) {
                $return[] = $this->storage[$i];
            }
        }
        return $return;
    }
       
}