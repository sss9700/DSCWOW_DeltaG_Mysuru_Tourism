import React, { Component, useState } from 'react'
import { Container, Jumbotron, Card, Button, Form} from 'react-bootstrap'
import { db } from '../firebase'
import BlogForm from './BlogForm'

class BlogHomePage extends Component {

    constructor() {
        super();
        this.state = {
            blogs: [],
        }
    }
    
    componentDidMount() {
        db.collection('blogs')
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                console.log(data);
                this.setState({ blogs: data });
            });
    }

    render () {

        return (
            <div className="blogpage">
                <Jumbotron className="blog-jumbotron text-center">
                    <div className="jumbo-text">
                        <h1 className="display-1">Mysuru Travel Blog</h1>
                    </div>
                </Jumbotron>
                <Container>
                        {this.state.blogs.map((item, index) => {
                            const blogLink = "/blog/" + index;
                            return (
                                <div className="padding">
                                    <Card>
                                        <Card.Header><h1>{item.blog_name}</h1></Card.Header>
                                        <Card.Body>
                                            <blockquote className="blockquote mb-0">
                                            <p>
                                                {' '}
                                                {item.content}
                                            {' '}
                                            </p>
                                            <footer className="blockquote-footer">
                                                <cite title="Source Title">{item.author_name}, {item.email}</cite>
                                            </footer>
                                            </blockquote>
                                            <Button href={blogLink} variant="primary">Check Full Article</Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )
                        })}
                </Container>
                <BlogForm/>
            </div>
        )
    }
}

export default BlogHomePage;
