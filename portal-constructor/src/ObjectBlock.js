import React, { Component } from 'react';

class ObjectBlock extends Component {

    constructor(props) {
        super(props);

        this.state = {
            buttonsPage: true
        };

        this.addObject      = this.addObject.bind(this);
        this.setButtonsPage = this.setButtonsPage.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
    }

    addObject(e) {
        this.props.addObject(e.currentTarget.name);
    }

    setButtonsPage(e){

        this.setState({
            buttonsPage: (e.currentTarget.name === "customFields")
        });
    }

    onDescriptionChange(e){
        this.props.onDescriptionChange(e.target.value)
    }

    renderObjectButton(type,title) {
        return  <button name={type} className="btn btn-default btn-xs objectButton col-xs-12" onClick={this.addObject}>
            <h6><b>{title}</b></h6>
        </button>;
    }

    renderBlockOfObjectButtons() {
        return this.state.buttonsPage?
            <div className="col-xs-12">
                <i>Select fields will be added to form</i>
                <h4>Add custom field</h4>
                <table className="table col-xs-12">
                        <tbody>
                            <tr>
                                <td>{this.renderObjectButton("text", "Single-line text")}</td>
                                <td>{this.renderObjectButton("radio", "Radio button")}</td>
                            </tr>
                            <tr>
                                <td>{this.renderObjectButton("checkbox", "Checkboxes")}</td>
                                <td>{this.renderObjectButton("select", "Select")}</td>
                            </tr>
                            <tr>
                                <td>{this.renderObjectButton("file", "File upload")}</td>
                                <td>{this.renderObjectButton("textarea", "Paragraph text")}</td>
                            </tr>
                        </tbody>
                </table>
            </div>
            :null;
    }

    renderDescriptionBlock() {

        return this.state.buttonsPage?null:
            <div className="row">
                <i className="col-xs-12">Optional form description</i>
                <h4 className="col-xs-12">Form description</h4>
                <div className="col-xs-12">
                    <textarea className="col-xs-12" name="textAreaDesription" value={this.props.description} onChange={this.onDescriptionChange}/>
                </div>
            </div>;
    }

    render() {
        if (this.props.editMode) {
            return (
                <div className="objectblock graySolidBorder col-lg-4 col-md-12 row" >
                    <div className="grayBG col-sm-12">
                        <h1 className="text-center">{this.props.titleOfPage}</h1>
                    </div>
                    <div className="col-sm-12">
                        <button className="btn btn-default col-xs-6 withoutBorder" name="customFields" onClick={this.setButtonsPage}>
                            <h3>Custom fields</h3>
                        </button>
                        <button className="btn btn-default col-xs-6 withoutBorder" name="cescriptionButton" onClick={this.setButtonsPage}>
                            <h3>Description</h3>
                        </button>
                        <div className={this.state.buttonsPage?"objectblock_modeDiv col-xs-6 selectedColour":"modeDiv col-xs-6"}/>
                        <div className={!this.state.buttonsPage?"objectblock_modeDiv col-xs-6 selectedColour":"modeDiv col-xs-6"}/>
                    </div>
                    {this.renderBlockOfObjectButtons()}
                    {this.renderDescriptionBlock()}
                </div>
            );
        }else {
            return null;
        }
    }
}

export default ObjectBlock;