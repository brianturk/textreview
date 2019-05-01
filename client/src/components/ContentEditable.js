// https://medium.com/@vraa/inline-edit-using-higher-order-components-in-react-7828687c120c

import React from 'react';

function contentEditable(WrappedComponent, parent, validationFunction) {

    return class extends React.Component {
  
      state = {
        editing: false
      }
  
      toggleEdit = (e) => {
        e.stopPropagation();
        if (this.state.editing) {
          this.cancel();
        } else {
          this.edit();
        }
      };
  
      edit = () => {
        this.setState({
          editing: true
        }, () => {
          this.domElm.focus();
        });
      };
  
      save = () => {
        this.setState({
          editing: false
        }, () => {
           //  if (this.props.onSave && this.isValueChanged()) {
            // console.log('Value is changed', this.domElm.textContent);
            //console.log(this);
            // how do I call the validation function in the parent?
            validationFunction(parent, this.domElm.textContent);
      //   }
        });
      };
  
      cancel = () => {
        this.setState({
          editing: false
        });
      };
  
      isValueChanged = () => {
        return this.props.value !== this.domElm.textContent
      };
  
      handleKeyDown = (e) => {
        const { key } = e;
        switch (key) {
          case 'Enter':
            this.save();
            break;

          case 'Escape':
            this.cancel();
            break;

          default:  
            break;
        }
      };
  

      render() {
        let editOnClick = true;
        const {editing} = this.state;
        if (this.props.editOnClick !== undefined) {
          editOnClick = this.props.editOnClick;
        }
        //console.log(this.props);
        return (
          <WrappedComponent
            className={editing ? 'editing' : ''}
            onClick={editOnClick ? this.toggleEdit : undefined}
            contentEditable={editing}
            ref={(domNode) => {
              this.domElm = domNode;
            }}
            onBlur={this.save}
            onKeyDown={this.handleKeyDown}
            {...this.props}
            >
            {this.props.value}
        </WrappedComponent>
        )
      }
    }
  }


  export default contentEditable;