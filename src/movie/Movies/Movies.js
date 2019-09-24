import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'antd';
import NewMovie from '../NewMovie/NewMovie';
import MovieTable from '../MovieTable/MovieTable';
import { getMovies } from '../../store/actions/movies';
import { getCategories } from '../../store/actions/categories';
import './Movies.css';

class Movies extends Component {
  state = {
    editingKey: '',
    showAddModal: false
  };

  componentDidMount() {
    this.props.getMovies();
    this.props.getCategories();
  }

  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      this.props.getMovies();
      this.props.getCategories();
    }
  }

  toggleAddModal = () => {
    this.setState({ showAddModal: !this.state.showAddModal });
  };

  onEdit = id => {
    this.setState({ editingKey: id });
  };

  onEditCancel = () => {
    this.setState({ editingKey: '' });
  };

  render() {
    return (
      <div className="movie-list-container">
        <h1 className="page-title">My watched movies</h1>
        <Row gutter={8}>
          <Col span={8} />
          <Col span={8} />
          <Col span={8}>
            <Button
              type="primary"
              size="large"
              className="create-poll-form-button"
              onClick={this.toggleAddModal}
            >
              Add new movie
            </Button>
            <NewMovie
              visible={this.state.showAddModal}
              categories={this.props.categories}
              onModalCancel={this.toggleAddModal}
            />
          </Col>
        </Row>
        <Row className="movie-table-container">
          <MovieTable
            movies={this.props.movies}
            categories={this.props.categories}
            editingKey={this.state.editingKey}
            onEdit={this.onEdit}
            onEditCancel={this.onEditCancel}
          />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ movies, categories }) => ({
  movies,
  categories
});

export default connect(
  mapStateToProps,
  { getMovies, getCategories }
)(Movies);
