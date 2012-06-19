<?php

class DataObject 
{
    
    private $schemaElement;
    private $parentObject;
    private $storage;
    
    
    public function DataObject($schemaElement) 
    {
        $this->schemaElement = $schemaElement;
    }
    
    public function getSchemaElement() 
    {
        return $this->schemaElement;
    }
    
    public function getParentObject() 
    {
        return $this->parentObject;
    }
    
    public function setParentObject($parentObject) 
    {
        $this->parentObject = $parentObject;
    }
    
    public function __set($name, $value) {
        //echo "<br/>Assign value to $name";
        if(is_object($value)) { 
            if(get_class($value) == 'DataObject' 
                || get_class($value) == 'ArrayDataObject'
                || get_class($value) == 'DataObjectProperty') {
                //echo "<br/>Adding child object as $name = " . get_class($value);
                $value->setParentObject($this);
                $this->storage[$name] = $value;
            } else {
                Die("<br/><b>Permission denied</b>");
            }
        } elseif(is_scalar($value) || !$value) {
            //echo "<br/>Adding scalar $name = $value";
            $this->storage[$name]->setValue($value);
        }
    }
    
    public function __get($name) {
        if(isset($this->storage[$name])) {
            return $this->storage[$name];
        }
        if($name === 'isDataObject') {
            return true;
        }
        if($name === 'typeName') {
            if($this->schemaElement->ref) {
                return $this->schemaElement->ref;
            } else {
                return $this->schemaElement->name;
            }
        }
    }
    
    public function getProperties() 
    {
        $return = array();
        if(count($this->storage) > 0) {
            foreach($this->storage as $child) {
                if(is_object($child) && $child->isDataObjectProperty) {
                    $return[] = $child;
                }
            }
        }
        return $return;
    }
    
    public function getChildren() 
    {
        $return = array();
        if(count($this->storage) > 0) {
            foreach($this->storage as $child) {
                if(is_object($child) && ($child->isDataObject || $child->isArrayDataObject)) {
                    $return[] = $child;
                }
            }
        }
        return $return;
    }    
}