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
        return this.props.description ==='' ? null:<div><h4>Description</h4><p></p><i>{this.props.description}</i></div>;
    }

    renderReqiredHeader(){
        return this.props.editMode?<th className="col-md-3">Reqired</th>:null;
    }

    renderErrorsBlock(){
        return this.props.errors===""?
            null:
            <div className="portalPage_errorsBlock">
                <h3>{this.props.errors}</h3>
            </div>;
    }

    render() {
        return (
            <div className={this.props.editMode?"graySolidBorder col-md-12 col-lg-8":"col-md-12"}>
                <div>
                    <h1>{this.props.titleOfPage}</h1>
                    <button className="btn btn-default portalPage_saveButton" onClick={this.onSaveButtonClick}>
                        {this.props.editMode?"Save":<span><span className="glyphicon glyphicon-pencil" aria-hidden="true"/>Edit</span>} form
                    </button>
                </div>
                {this.renderDescription()}
                {this.renderErrorsBlock()}
                <table className="table">
                    <thead>
                    <tr>
                        <th className="col-md-5">Question title</th>
                        <th className={this.props.editMode?"col-md-4":"col-md-7"}>Choises</th>
                        {this.renderReqiredHeader()}
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderForm()}
                    </tbody>
                </table>
                {this.props.editMode?null:<input className="portalPage_submitBtn btn btn-default btn-lg glyphicon-align-right" type="submit" value="Submit" onClick={this.onSubmitButtonsClick}/>}
            </div>
        );
    }
}

export default PortalPage;