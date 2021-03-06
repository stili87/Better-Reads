import './home-page.css'
import React from 'react'
import { useSelector } from 'react-redux'
import HomeBook from './homeBook'
import LeftDisplay from './leftDisplay'
import { Link } from 'react-router-dom'

function HomePage() {

    const books = Object.values(useSelector(state => state.books)).reverse()
    const genres = Object.values(useSelector(state => state.genres)).sort((a,b) => {
                                                                        if(a.name > b.name)return 1
                                                                        return -1
                                                                            })



    return (
        <div id='home-display'>
            <h1 id='home-right-header'>Welcome to Better Reads</h1>
            <h2 id='home-right-books-header'>List of Recent Books</h2>
            <div id='home-main'>
                <div id='home-left-display'>
                    <LeftDisplay />
                </div>
                <div id='home-right-display'>
                    {books.map(book => <HomeBook key={book.id} book={book} />)}
                </div>
                <div id='home-genre-about'>
                    <div id='home-genre-list'>
                        <p id='home-genre-list-header'> Books by genre</p>
                        {genres.map(genre => <Link id="home-genre-list-link" to={`/genre/${genre.id}`} key={genre.id}>{genre.name.toUpperCase()}</Link>)}
                    </div>
                    <div id='footer-container'>
                        <div id='home-genre-list-header' className='bottom-link'>Technologies</div>
                        <div id='footer-link'>
                            <a id='tech-link' href='https://docs.python.org/3/index.html'>Python</a>
                        </div>
                        <div id='footer-link'>
                            <a id='tech-link' href='https://flask.palletsprojects.com/en/1.1.x/'>Flask</a>
                        </div>
                        <div id='footer-link'>
                            <a id='tech-link' href='https://wtforms.readthedocs.io/en/2.3.x/'>WTForms</a>
                        </div>
                        <div id='footer-link'>
                            <a id='tech-link' href='https://flask-wtf.readthedocs.io/en/stable/'>FlaskWTF</a>
                        </div>
                        <div id='footer-link'>
                            <a id='tech-link' href='https://flask-migrate.readthedocs.io/en/latest/'>Flask-Migrate</a>
                        </div>
                        <div id='footer-link'>
                            <a id='tech-link' href='https://flask-sqlalchemy.palletsprojects.com/en/2.x/'>FlaskSQLAlchemy</a>
                        </div>
                        <div id='footer-link'>
                            <a id='tech-link' href='https://alembic.sqlalchemy.org/en/latest/'>Alembic</a>
                        </div>
                        <div id='footer-link'>
                            <a id='tech-link' href='https://reactjs.org/docs/getting-started.html'>React</a>
                        </div>
                        <div id='footer-link'>
                            <a id='tech-link' href='https://github.com/boto/boto3'>Boto3 AWS</a>
                        </div>
                        <div id='footer-link'>
                            <a id='tech-link' href='https://www.npmjs.com/package/multiselect-react-dropdown'>Multiselect</a>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default HomePage
