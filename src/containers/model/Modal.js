import React from 'react';


class Modal extends React.Component {
    
  
    handleClose = () => {
        this.props.hideModal();
    }

    render() {
        let {children} = this.props;
  
          return (
                <div className="modal-primary-container">
                    <div className="modal-primary search-modal">
                        <button className="modal-close-button" aria-label="close button" onClick={this.handleClose}> 
                           <i className="fas fa-times"></i>
                        </button>
                        {children}
                    </div>
                </div>
            )
    }
}

export default Modal;