import * as React from 'react';
import styled from 'styled-components';
import ExpandableProperty from './ExpandableProperty';
import { camelCaseToNormal } from './utils';
import {testJson } from './testJson'

const RecursivePropertyContainer = styled.div`
  padding-top: 10px;
  padding-left: 3px;
  margin-left: 10px;
  ${(props: { excludeBottomBorder: boolean }) =>
    props.excludeBottomBorder ? '' : 'border-bottom: 1px solid #b2d6ff;'}
  color: #666;    
  font-size: 16px;
`;

export const PropertyName = styled.span`
  color: black;
  font-size: 14px;
  font-weight: bold;
`;

interface IterableObject {
  [s: number]: number | string | boolean | IterableObject;
}

interface Props {
  property: number | string | boolean | IterableObject;
  propertyName: string;
  excludeBottomBorder: boolean;
  emptyPropertyLabel?: string;
  rootProperty?: boolean;
  propertyNameProcessor?: (name:any) => any;
}

function insertData(data:any,key:any) {
    var rsdata ;
    if(data.name===key){
      rsdata = {name:"New Child",data:'Data'}
      data.children.push(rsdata)
      return;
    }
    data.children.map((val:any)=>{
      console.log(val.name,key)
      if(val.name===key){

        console.log("Updated:" , val)
        
        if(val.data){ 
          val = {name:val.name,children:[{name:"New Child",data:"Data"}]}  
          console.log("Reseted",val)
        }
        else{
          rsdata = {name:"New Child",children:[]}
          val.children.push(rsdata)
        }
      
        // return;  
      }
      else{
        if(val.children)
            return insertData(val,key);
      }
      
    })
}

const RecursiveProperty: React.FC<Props> = props => {
 
  return (
    <RecursivePropertyContainer excludeBottomBorder={props.excludeBottomBorder}>
      {props.property ? (
        typeof props.property === 'number' ||
          typeof props.property === 'string' ||
          typeof props.property === 'boolean' ? (
            <React.Fragment>
              <div style={{display:"flex",flexDirection:"row" , justifyContent:"space-between"}} >
                <div>
                <PropertyName>{props.propertyNameProcessor!(props.propertyName)}: </PropertyName>
                {props.property} 
                </div>
                <div>

                  {
                    props.propertyName!="data" &&
                    <button onClick={()=>{
                      
                      // var res = JSON.stringify(data)    
                      // testJson.children.map((val,ind)=>{
                      //   // if(val==props.property)
                      //   console.log("Map :" , val)
                      // })
                      insertData(testJson,props.property)
                      // var res = testJson.children.push(data); 
                      console.log("Data:" , testJson)

                    }} >Add Child </button>
                  }     
                </div>
              </div>
            </React.Fragment>
          ) : (
            <ExpandableProperty title={props.propertyNameProcessor!(props.propertyName)} expanded={!!props.rootProperty}>
              {Object.values(props.property).map((property, index, { length }) => (
                <RecursiveProperty
                  key={index}
                  property={property} 
                  propertyName={Object.getOwnPropertyNames(props.property)[index]}
                  propertyNameProcessor={props.propertyNameProcessor}
                  excludeBottomBorder={index === length - 1}
                />
              ))}
            </ExpandableProperty>
          )
      ) : props.emptyPropertyLabel
      }
    </RecursivePropertyContainer>
  );
}

RecursiveProperty.defaultProps = {
  emptyPropertyLabel: 'Property is empty',
  excludeBottomBorder: false,
  propertyNameProcessor: camelCaseToNormal
};

export default RecursiveProperty;