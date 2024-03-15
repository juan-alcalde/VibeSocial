							// written by Juan Alcalde 
                            // November 01 2023
                    
import { Route, Routes } from "react-router-dom";
import { ComponentList } from "../component1/componentList"
import { HomePostList } from "../home/homeList";
import { PostForm } from "../home/PostForm";
import "../views/appview.css"
import { PostDetails } from "../home/PostDetails";
import { PostEdit } from "../home/PostEdit";

export const ApplicationViews = () => {
	return (
		<Routes>
				<Route path="/" element = {<HomePostList/>} />
				<Route path="/:postId" element = {<PostDetails/>} />
				<Route path="/:postId/edit" element={ <PostEdit/> } />
				<Route path="/create" element = {<PostForm/>} /> 
				<Route path="/comp" element = {<ComponentList/>} /> 
				
		</Routes>
	)
}

