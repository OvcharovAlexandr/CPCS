import React, { Component } from 'react';
import ObjectRow from './ObjectRow';

class PortalPage extends Component {

    constructor(props) {
        super(props);

        this.removeObject   = this.removeObject.bind(this);
        this.moveObject     = this.moveObject.bind(this);
        this.saveObject     = this.saveObject.bind(this);
        this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
        this.onSubmitButtonsClick = this.onSubmitButtonsClick.bind(this);
    }

    onSaveButtonClick(e) {
        this.props.trigerEditMode();
    }

    onSubmitButtonsClick(e) {
        this.props.submitForm();
    }

    removeObject(id){
        this.props.removeObject(id);
    }

    moveObject(object, mode){
        this.props.moveObject(object, mode);
    }

    saveObject(object){
        this.props.saveObject(object);
    }

    renderForm(){
        return this.props.objectsOfPage.map(object =>
                        <ObjectRow
                            editMode={this.props.editMode}
                            object={object}
                            key={object.id}
                            removeObject={this.removeObject}
                            moveObject={this.moveObject}
                            saveObject={this.saveObject}
                        />);
    }

    renderDescription(){
        return this.props.description ==='' ? null:<div><h2>Description</h2><p></p>{this.props.description}</div>;
    }

    renderReqiredHeader(){
        return this.props.editMode?<th>Reqired</th>:null;
    }

    renderErrorsBlock(){
        return this.props.errors===""?
            null:
            <div className="errorsBlock">
                <h3>{this.props.errors}</h3>
            </div>;
    }

    render() {
        return (
            <div className="pageBlock">
                <div className="titleOfPage">
                    <h1>{this.props.titleOfPage}</h1>
                    <button className="saveButton" onClick={this.onSaveButtonClick}>{this.props.editMode?"Save":"Edit"} form</button>
                </div>
                {this.renderDescription()}
                {this.renderErrorsBlock()}
                <table className="tableOfObjects">
                    <thead>
                    <tr>
                        <th>Question title</th>
                        <th>Choises</th>
                        {this.renderReqiredHeader()}
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderForm()}
                    </tbody>
                </table>
                {this.props.editMode?null:<input type="submit" value="Submit" onClick={this.onSubmitButtonsClick}/>}
            </div>
        );
    }
}

export default PortalPage;