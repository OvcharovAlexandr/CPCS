import React, { Component } from 'react';

class ObjectRow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editingField: "",
            questionTitle: this.props.object.questionTitle,
            nameOfObject: this.props.object.name,
            nameOfChoise: ""
        };

        this.removeObject = this.removeObject.bind(this);
        this.moveObject = this.moveObject.bind(this);
        this.setQuestionTitle = this.setQuestionTitle.bind(this);
        this.editQuestionTitle = this.editQuestionTitle.bind(this);
        this.handlerOnQuestionChange = this.handlerOnQuestionChange.bind(this);
        this.handlerRequiredChange = this.handlerRequiredChange.bind(this);
        this.editName = this.editName.bind(this);
        this.handlerOnNameChange = this.handlerOnNameChange.bind(this);
        this.setName = this.setName.bind(this);

        this.editField = this.editField.bind(this);
        this.removeField = this.removeField.bind(this);
        this.addChoise = this.addChoise.bind(this);

        this.onSelectChange = this.onSelectChange.bind(this);
        this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
        this.onChangeRadio = this.onChangeRadio.bind(this);

        this.onChangeText = this.onChangeText.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.onChangeTextarea = this.onChangeTextarea.bind(this);

        this.handlerOnChoiseChange = this.handlerOnChoiseChange.bind(this);
        this.setChoiseName = this.setChoiseName.bind(this);
    }

    //rows

    removeObject(e){
        this.props.removeObject(this.props.object.id);
    }

    moveObject(e){
        this.props.moveObject(this.props.object, e.currentTarget.name);
    }

    //questoin block

    handlerOnQuestionChange(e){
        this.setState({
            questionTitle: e.target.value
        });
    }

    setQuestionTitle(e){
        this.setState({
            editingField:""
        });

        let {object} = this.props;
        object.questionTitle = this.state.questionTitle;
        this.props.saveObject(object);
    }

    editQuestionTitle(e){
        this.setState({
            editingField:"questionTitle"
    });
    }

    editName(e){
        this.setState({
            editingField:"name"
        });
    }

    setName(e){
        this.setState({
            editingField:""
        });

        let {object} = this.props;
        object.name = this.state.nameOfObject;
        this.props.saveObject(object);
    }

    handlerOnNameChange(e){
        this.setState({
            nameOfObject: e.target.value
        });
    }

    //Reqired

    handlerRequiredChange(e) {

        let {object} = this.props;
        object.required = e.target.checked;
        this.props.saveObject(object);
    }

    //Operations with fielsd

    editField(e){

        let nameOfChoise;

        switch (this.props.object.typeOfField) {
            case "radio":
                nameOfChoise = this.props.object.fields.filter(curField=> curField.id === e.currentTarget.name)[0].value;
                break;
            case "checkbox":
                nameOfChoise = this.props.object.fields.filter(curField=> curField.id === e.currentTarget.name)[0].value;
                break;
            case "select":
                nameOfChoise = this.props.object.options.filter((option, index) => index===this.props.object.selectedIndex)[0].value;
                break;
            default:
                return;
        }

        this.setState({
            editingField: e.currentTarget.name,
            nameOfChoise: nameOfChoise
        });
    }

    removeField(e){

        let {object} = this.props;

        switch (object.typeOfField){
            case "radio":

                if (object.fields.length === 2) {
                    alert("It can`t be less than 2 variants");
                    return;
                }

                const radioFields = object.fields.filter(field => field.id!==e.currentTarget.name);
                object.fields = radioFields;
                object.selectedIndex = 0;

                break;
            case "checkbox":

                if (object.fields.length === 2) {
                    alert("It can`t be less than 2 variants");
                    return;
                }

                const checkboxFields = object.fields.filter(field => field.id!==e.currentTarget.name);
                object.fields = checkboxFields;

                break;
            case "select":

                if (object.options.length === 2) {
                    alert("It can`t be less than 2 options");
                    return;
                }

                const options = object.options.filter((option, index) => !index===object.selectedIndex);
                object.options = options;
                object.selectedIndex = 0;

                break;

             default:
                return;

        }

        this.props.saveObject(object);
    }

    addChoise(e){

        const uuidv1 = require('uuid/v1');
        let {object} = this.props;

        switch (object.typeOfField) {

            case "radio":
                object.fields = [...object.fields,
                    {id:uuidv1(), value:"Set the variant name"}];
                break;
            case "checkbox":
                object.fields = [...object.fields,
                    {id:uuidv1(), value:"Set the variant name", checked:false}];
                break;
            case "select":
                object.options = [...object.options,
                    {id:uuidv1(), value:"Set the variant name"}];
                break;
            default:
                return;
        }

        this.props.saveObject(object);
    }

    handlerOnChoiseChange(e) {
        this.setState({
            nameOfChoise: e.target.value
        });
    }

    setChoiseName(e) {
        this.setState({
            editingField:""
        });

        let {object} = this.props;

        //object.name = this.state.nameOfChoise;

        switch (this.props.object.typeOfField) {
            case "radio":
                object.fields = object.fields.map(curField=>
                    curField.id===this.state.editingField?
                    {id:curField.id, value:this.state.nameOfChoise}:
                    curField);
                break;
            case "checkbox":
                object.fields = object.fields.map(curField=>
                    curField.id===this.state.editingField?
                    {id:curField.id, value:this.state.nameOfChoise, checked:curField.checked}:
                    curField);
                break;
            case "select":
                object.options = object.options.map((curField, index)=>
                    index===this.props.object.selectedIndex?
                    {id:curField.id, value:this.state.nameOfChoise}:
                    curField);
                break;
            default:
                return;
        }
        this.props.saveObject(object);
    }

    //Handlers of fiels changes

    onSelectChange(e, item) {
        let {object} = this.props;
        object.selectedIndex = e.target.selectedIndex;
        this.props.saveObject(object);
    }

    onChangeRadio(e, item) {
        let {object} = this.props;
        object.selectedIndex = e.target.attributes.getNamedItem("cur-index").value;
        this.props.saveObject(object);
    }

    onChangeCheckbox(e) {

        let {object} = this.props;
        object.fields = object.fields.map(curField => curField.id===e.target.attributes.getNamedItem("cur-id").value?
                                                        {id:curField.id, value:curField.value, checked: e.target.checked}:
                                                        curField);
        this.props.saveObject(object);

    }

    onChangeText(e) {
        let {object} = this.props;
        object.field.value = e.target.value;
        this.props.saveObject(object);
    }

    onChangeFile(e) {
        let {object} = this.props;
        object.field.value = e.target.value;
        this.props.saveObject(object);
    }

    onChangeTextarea(e) {
        let {object} = this.props;
        object.field.value = e.target.value;
        this.props.saveObject(object);
    }

    //Auxiliary functions of rendering elements

    renderQuestionTitleBlock(){
        switch (this.state.editingField) {

            case "questionTitle":

                return  <div> Enter the question:
                            <input type="text" value={this.state.questionTitle} onChange={this.handlerOnQuestionChange}/>
                            <button onClick={this.setQuestionTitle}>Set</button>
                        </div>;
            case "name":

                return  <div> Enter the name:
                    <input type="text" value={this.state.nameOfObject} onChange={this.handlerOnNameChange}/>
                    <button onClick={this.setName}>Set</button>
                </div>;

            default:
                return  <div>
                            <h3>{this.props.object.questionTitle}{this.props.object.required?"*":""}</h3>
                            {this.props.editMode?<button onClick={this.editQuestionTitle}>Edit</button>:null}
                            {this.props.editMode?<p>Name of element: {this.props.object.name}<button onClick={this.editName}>Edit</button></p>:null}
                        </div>;
        }
    }

    renderButtonsBlock() {
        return this.props.editMode ?
                    <td>
                        <input type="checkbox" onChange={this.handlerRequiredChange} checked={this.props.object.required}/>
                        <button onClick={this.removeObject}>Remove</button>
                        <button name="moveUp" onClick={this.moveObject}>Move up</button>
                        <button name="moveDown"onClick={this.moveObject}>Move down</button>
                    </td>: null;
    }

    renderFieldButtons(id) {

        return this.props.editMode?
            <div>
                <button name={id} onClick={this.editField}>edit</button>
                <button name={id} onClick={this.removeField}>remove</button>
            </div>:
            null;
    }

    renderAddChoiseButton() {
        return this.props.editMode?
                <p><button onClick={this.addChoise}>add choise</button></p>:
                null;
    }

    renderField() {
        switch (this.props.object.typeOfField) {
            case "text":
                return <td><input name={this.props.object.name}
                                  type="text"
                                  placeholder={this.props.object.field.placeholder}
                                  onChange={this.onChangeText}/></td>;

            case "radio":
                return  this.renderRadioField();

            case "checkbox":
                return  this.renderCheckboxField();

            case "select":
                return  this.renderSelectField();

            case "file":
                return <td><input name={this.props.object.name}
                                  type="file"
                                  placeholder={this.props.object.placeholder}
                                  onChange={this.onChangeFile}/></td>;

            case "textarea":
                return <td><textarea name={this.props.object.name}
                                     onChange={this.onChangeTextarea}/></td>;

            default:
                return null;
        }
    }

    renderEditingChoiseBlock(){
        return  <div> Enter the choise text:
                    <input type="text" value={this.state.nameOfChoise} onChange={this.handlerOnChoiseChange}/>
                    <button onClick={this.setChoiseName}>Set</button>
                </div>;
    }

    renderRadioField(){
        return  <td>
            {this.props.object.fields.map((curField, index) =>
                <div key={curField.id}>
                    {curField.id===this.state.editingField?this.renderEditingChoiseBlock():
                        <div>
                            <input name={this.props.object.name}
                                    type="radio"
                                    cur-index={index}
                                    value={curField.value}
                                    defaultChecked={index===0}
                                    onChange={this.onChangeRadio}/>
                            {curField.value}
                            {this.renderFieldButtons(curField.id)}
                        </div>}
                </div>)}
            {this.renderAddChoiseButton()}
        </td>;
    }

    renderCheckboxField(){
        return  <td>
            {this.props.object.fields.map((curField, index) =>
                <div key={curField.id}>
                    {curField.id===this.state.editingField?this.renderEditingChoiseBlock():
                    <div>
                        <input name={this.props.object.name}
                               type="checkbox"
                               cur-id={curField.id}
                               value={curField.value}
                               onChange={this.onChangeCheckbox}/>
                        {curField.value}
                        {this.renderFieldButtons(curField.id)}
                    </div>}
                </div>)}
            {this.renderAddChoiseButton()}
        </td>;
    }

    renderSelectField() {
        return  <td>
            {this.props.object.id===this.state.editingField?this.renderEditingChoiseBlock():
                    <div>
                        <select name={this.props.object.name}
                            onChange={this.onSelectChange}
                            defaultValue={this.props.object.options[this.props.object.selectedIndex].value}>
                            {this.props.object.options.map((curField, index) =>
                                <option key={curField.id} value={curField.value}>
                                    {curField.value}
                                </option>)}
                        </select>
                        {this.renderFieldButtons(this.props.object.id)}
                    </div>}
                    {this.renderAddChoiseButton()}
                </td>;
    }

    render() {
        return <tr>
                    <td>{this.renderQuestionTitleBlock()}</td>
                    {this.renderField()}
                    {this.renderButtonsBlock()}
                </tr>;
    }

}

export default ObjectRow;

