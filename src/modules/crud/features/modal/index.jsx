import React from 'react';
import './style.css'



  
class Mdl extends React.Component {

    render(){
        return (
            <div className={`modal_cont ${this.props.isOpen ? "db" : "dn"}`}>
                <div className="mdl">
                    <div className="header">
                        <h3>{this.props.editable ? "Edit Student" : "Add Student"}</h3>
                    </div>

                    <form action="" method="POST" onSubmit={this.props.handleSubmit}>
                        <div className="cont_body">
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" name="title" className="form-control" 
                                value={this.props.title}
                                onChange={this.props.changeHandler}/>
                            </div>
                            <div className="form-group">
                                <label>Body</label>
                                <textarea  name="body" className="form-control" onChange={this.props.changeHandler} value={this.props.body}/>
                            </div>
                        </div>
                        <div className="footer">
                            <button type="button" style={{backgroundColor: "#c34646"}} onClick={this.props.close}>Close</button>
                            <button type="submit" style={{backgroundColor: "#358835"}}>{this.props.editable ? "Edit" : "Add"}</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
  }
  
 export default Mdl;
