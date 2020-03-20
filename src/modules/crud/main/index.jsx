import React from 'react';
import Axios from 'axios'
// import API from 'api';
import './style.css'

import Mdl from '../features/modal'

const URL = 'https://jsonplaceholder.typicode.com/'


class StudentPortal extends React.Component { 
    state = {
        post: [],
        title: "",
        body: "",
        isModalOpen: false,
        editable: false,
        editablePost: null
    }

    componentDidMount(){
        
        Axios.get(URL+"posts")
                .then(res => this.setState({post: res.data}))
                .catch(e => console.log(e))
                
        

    }

    createPost = e => {
        e.preventDefault();
        const {title,body,post} = this.state;

        if(this.state.editable){

            const {post} = this.state;
            const postt = post.find(post => post.id === this.state.editablePost);
            postt.title = title;
            postt.body = body;
            this.setState({postt,title:"",body:"",editable:false,editablePost:null,isModalOpen:false}); 

        }else{
            
                
        
                Axios.post(URL+"posts",
                        {
                        title: title,
                        body: body
                    })
                  .then(res => {
                      if(res.status == 201){
                        console.log(res);
        
                        const posts = [...post, {
                            userId: post[post.length - 1].id + 1,
                            id: post[post.length - 1].id + 1,
                            title: title,
                            body: body
                        }];
                        this.setState({post: posts, title:"",body:"",isModalOpen:false});
                        
                      }
                    
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
        }

    }

    editHandler = () => {
        this.setState({isModalOpen: !this.state.isModalOpen})


        // const {students} = this.state;
        // const student = students.find(student => student.id === id);
        // student.name = name;
        // student.dept = dept;
        // this.setState({students}); 
    }

    handleDelete = id => {

        Axios.delete(URL+"posts/"+id)
            .then(res => {
                if(res.status == 200){
                    const post = this.state.post.filter(post => post.id != id);
                    this.setState({post});
                }
            console.log(res);
        }).catch(e => console.log(e));

        // Axios.delete('https://jsonplaceholder.typicode.com/posts/1', {
        //     method: 'DELETE'
        // }).then(res => console.log(res))



    }

    changeHandler = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    modalHandler = (isSubmitable,id) => {
        // if isSubmitable == 1 then Submitable
        // if isSubmitable == 2 then Editable
        if(isSubmitable == 2){
            const {post} = this.state;
            const postt = post.find(post => post.id === id);
            


            this.setState({isModalOpen: !this.state.isModalOpen,editable:true,editablePost:id,title:postt.title,body:postt.body})
        }else{
            this.setState({isModalOpen: !this.state.isModalOpen,editable:false})
        }
    }
    modalCloseHandler = () => {
        this.setState({isModalOpen: !this.state.isModalOpen,editable:false,editablePost:null,title:"",body:""}) 
    }

    render(){
        console.log(this.state)
       
        return (
            // <div>
            //     <h3>Online posts</h3>
            //     <ul>
            //         {this.state.student.map(({title,id}) => <li key={id}>{title}</li>)}
            //     </ul>
            // </div>

            <div className="main_portal">
                
                <div className="row">
                    <div className="col-lg-12 viw">
                        <div>
                        <button  className="btn btn-sm btn-info" onClick={() => this.modalHandler(1)}
                        style={{position: "fixed"}}>Add Post</button>
                        </div>
                        {/* <div className="d-flex justify-content-end">
                        <button onClick={() => handleViewChange("1")} className={`btn btn-${viewStatus === "1" ? "success" : "info"} mr-2`}>List View</button>
                        <button onClick={() => handleViewChange("2")} className={`btn btn-${viewStatus === "2" ? "success" : "info"} mr-2`}>Grid View</button>
                        <button onClick={() => handleViewChange("3")} className={`btn btn-${viewStatus === "3" ? "success" : "info"} mr-2`}>Table View</button>
                        </div> */}
                        <Mdl 
                            isOpen={this.state.isModalOpen}
                            close={this.modalCloseHandler}
                            handleSubmit={this.createPost}
                            changeHandler={this.changeHandler}
                            title={this.state.title}
                            body={this.state.body}
                            editable={this.state.editable}
                        />


                        
                        <div className="container grid_view">
                            <h3>Grid View</h3>
                            <div className="row">
                        
                                {this.state.post.map(({id,title,body},indx) =>
                                <div className="col-sm-4" key={id}>
                                    <div className={`item list-group-item-${indx%2===0?"info":"success"}`}>
                                        <h6>{id}</h6>
                                        <h5>{title}</h5>
                                        <p>{body}</p>
                                        <button  className="btn btn-sm btn-success mr-2" onClick={() => this.modalHandler(2,id)}>Edit</button>
                                        <button  className="btn btn-sm btn-danger" onClick={() => this.handleDelete(id)}>delete</button>
                                    </div>
                                </div>
                                )}
                        
                            </div>
                        </div>








                    </div>
                </div>

            </div>
        )
    }
}

export default StudentPortal;