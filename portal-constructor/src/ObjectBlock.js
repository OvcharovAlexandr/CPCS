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
        return  <button name={type} className="objectButton" onClick={this.addObject}>
            <h3>{title}</h3>
        </button>;
    }

    renderBlockOfObjectButtons() {
        return this.state.buttonsPage?
            <div className="blockOfObjectButtons">
                <h3>Select fields will be added to form</h3>
                <h2>Add custom field</h2>
                <table className="tableOfButtons">
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
            <div className="descriptionBlock">
                <h3>Optional form description</h3>
                <h2>Form description</h2>
                <textarea name="textAreaDesription" value={this.props.description} onChange={this.onDescriptionChange}/>
            </div>;
    }

    render() {
        if (this.props.editMode) {
            return (
                <div className="objectBlock">
                    <div className="titleOfPage">
                        <h1>{this.props.titleOfPage}</h1>
                    </div>
                    <div>
                        <button className="modeButton" name="customFields" onClick={this.setButtonsPage}>
                            <h3>Custom fields</h3>
                        </button>
                        <button className="modeButton" name="cescriptionButton" onClick={this.setButtonsPage}>
                            <h3>Description (Optional)</h3>
                        </button>
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