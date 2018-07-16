import React, { Component } from 'react';
import './App.css';
import ObjectBlock from './ObjectBlock';
import PortalPage from './PortalPage';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            objectsOfPage:[],
            titleOfPage: 'Page constructor',
            editMode: true,
            description: '',
            errors: ""
        };

        this.addObject = this.addObject.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.removeObject = this.removeObject.bind(this);
        this.moveObject = this.moveObject.bind(this);
        this.saveObject = this.saveObject.bind(this);
        this.trigerEditMode = this.trigerEditMode.bind(this);
        this.submitForm = this.submitForm.bind(this);

    }

    addObject(type) {

        let {objectsOfPage} = this.state;

        const uuidv1 = require('uuid/v1');
        const newId = uuidv1();

        switch (type) {
            case "text":

                objectsOfPage = [...objectsOfPage,
                        {id: newId,
                        questionTitle: "Set the quetion title",
                        required: false,
                        typeOfField: type,
                        name:"textField",
                        field:{value:"", placeholder: "Enter the text"}}];
                break;

            case "radio":

                objectsOfPage = [...objectsOfPage,
                    {id: newId,
                        questionTitle: "Set the quetion title",
                        required: false,
                        typeOfField: type,
                        name:"radioButton",
                        selectedIndex: 0,
                        fields:[{id:uuidv1(), value:"Set the variant name"},
                                {id:uuidv1(), value:"Set the variant name"}]}];
                break;

            case "checkbox":

                objectsOfPage = [...objectsOfPage,
                    {id: newId,
                        questionTitle: "Set the quetion title",
                        required: false,
                        typeOfField: type,
                        name:"checkbox",
                        fields:[{id:uuidv1(), value:"Set the variant name", checked:false},
                                {id:uuidv1(), value:"Set the variant name", checked:false}]}];
                break;

            case "select":

                objectsOfPage = [...objectsOfPage,
                    {id: newId,
                        questionTitle: "Set the quetion title",
                        required: false,
                        typeOfField: type,
                        name:"selectField",
                        selectedIndex: 0,
                        options:[   {id:uuidv1(), value:"Set the variant name"},
                                    {id:uuidv1(), value:"Set the variant name2"}]}];
                break;

            case "file":

                objectsOfPage = [...objectsOfPage,
                    {id: newId,
                        questionTitle: "Set the quetion title",
                        required: false,
                        typeOfField: type,
                        name:"fileField",
                        field:{value:""}}];
                break;

            case "textarea":

                objectsOfPage = [...objectsOfPage,
                    {id: newId,
                        questionTitle: "Set the quetion title",
                        required: false,
                        typeOfField: type,
                        name:"textareaField",
                        field:{value:""}}];
                break;

            default:
                return;
        }

        this.setState({
            objectsOfPage: objectsOfPage
        });
    }

    removeObject(id) {
        this.setState({
            objectsOfPage: this.state.objectsOfPage.filter(curObject => curObject.id !== id)
        });
    }

    moveObject(object, mode){

        const {objectsOfPage}=this.state;
        let curIndex = objectsOfPage.indexOf(object);

        switch (mode) {
            case "moveUp":
                if (curIndex === 0) {return;}
                objectsOfPage.splice(curIndex - 1, 2, object, objectsOfPage[curIndex - 1]);
                break;

            case "moveDown":
                if (curIndex === (objectsOfPage.length - 1)) {return;}
                objectsOfPage.splice(curIndex, 2, objectsOfPage[curIndex + 1], object);
                break;

            default:
                return;
        }

        this.setState({
            objectsOfPage: objectsOfPage
        });
    }

    onDescriptionChange(text){
        this.setState({
            description: text
        });
    }

    saveObject(object){
        this.setState({
            objectsOfPage: this.state.objectsOfPage.map(curObject => curObject.id === object.id ? object : curObject)
        });
    }

    trigerEditMode() {
        this.setState({
            editMode: !this.state.editMode
        });
    }

    inspectBeforeSubmit() {

        this.setState({
            errors: ""
        });

        let errors = "";

        this.state.objectsOfPage.forEach(curObject =>{
            if (curObject.required){

                if ((curObject.typeOfField==="text" && curObject.field.value==="")
                    || (curObject.typeOfField==="radio" && curObject.selectedIndex==="")
                    || (curObject.typeOfField==="checkbox" && curObject.fields.filter(curFiend => curFiend.checked).length===0)
                    || (curObject.typeOfField==="select" && curObject.selectedIndex==="")
                    || (curObject.typeOfField==="file" && curObject.field.value==="")
                    || (curObject.typeOfField==="textarea" && curObject.field.value==="")) {

                    errors += "field [" + curObject.name + "] is required to fill; ";
                }
            }
        });

        this.setState({
            errors: errors
        });

        return errors==="";

    }

    submitForm(){

        if (!this.inspectBeforeSubmit()) {
            return;
        }

        const stringOfReturn = this.state.objectsOfPage.map(curObject=>{
            switch (curObject.typeOfField){
                case "text":
                    return "" + curObject.questionTitle + ": " + curObject.field.value;
                case "radio":
                    return "" + curObject.questionTitle + ": " + curObject.fields[curObject.selectedIndex].value;
                case "checkbox":
                    return "" + curObject.questionTitle + ": " + curObject.fields.filter(curField=> curField.checked).map(curField=>curField.value);
                case "select":
                    return "" + curObject.questionTitle + ": " + curObject.options[curObject.selectedIndex].value;
                case "file":
                    return "" + curObject.questionTitle + ": " + curObject.field.value;
                case "textarea":
                    return "" + curObject.questionTitle + ": " + curObject.field.value;
                default:
                    return "";
            }
        }).toString();

        alert(stringOfReturn);

    }

    render() {

        return (
            <div className="container-fluid graySolidBorder" >
                <div className="row">
                <ObjectBlock editMode={this.state.editMode}
                             titleOfPage={this.state.titleOfPage}
                             buttonsPage={this.state.buttonsPage}
                             description={this.state.description}
                             addObject={this.addObject}
                             onDescriptionChange={this.onDescriptionChange}
                />
                <PortalPage  editMode={this.state.editMode}
                             errors={this.state.errors}
                             titleOfPage={this.state.titleOfPage}
                             objectsOfPage={this.state.objectsOfPage}
                             description={this.state.description}
                             removeObject={this.removeObject}
                             moveObject={this.moveObject}
                             saveObject={this.saveObject}
                             trigerEditMode={this.trigerEditMode}
                             submitForm={this.submitForm}
                />
                </div>
            </div>
        );
    }
}

export default App;
