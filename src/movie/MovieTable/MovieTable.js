import React, { Component } from 'react';
import './MovieTable.css';
import EditableRow from '../EditableRow/EditableRow';
import EditableCell from '../EditableCell/EditableCell';
import { Table, Input, Popconfirm, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import { removeMovie, editMovie } from '../../store/actions/movies';
import { withRouter } from 'react-router-dom';

export const EditableContext = React.createContext();

class MovieTable extends Component {
  state = {
    searchText: ''
  };

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  isEditing(movie) {
    return movie.id === this.props.editingKey;
  }

  updateMovie = (form, id) => {
    form.validateFields((error, row) => {
      if (error) return;

      const movieData = {
        movieId: id,
        rating: row.rating,
        comment: row.comment
      };

      this.props.editMovie(movieData);
      this.props.onEditCancel();
    });
  };

  render() {
    const {
      movies,
      categories,
      onEdit,
      onEditCancel,
      removeMovie
    } = this.props;

    const categoryFilters = categories.map(cat => {
      return {
        text: cat.name,
        value: cat.name
      };
    });

    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell
      }
    };

    const columnsData = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters
        }) => (
          <div className="custom-filter-dropdown">
            <Input
              ref={ele => (this.searchInput = ele)}
              placeholder="Search name"
              value={selectedKeys[0]}
              onChange={e =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
            >
              Search
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)}>
              Reset
            </Button>
          </div>
        ),
        filterIcon: filtered => (
          <Icon
            type="search"
            style={{ color: filtered ? '#108ee9' : '#aaa' }}
          />
        ),
        onFilter: (value, movie) =>
          movie.name.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            });
          }
        },
        render: text => {
          const { searchText } = this.state;
          return searchText ? (
            <span>
              {text
                .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))
                .map(
                  (fragment, i) =>
                    fragment.toLowerCase() === searchText.toLowerCase() ? (
                      <span key={i} className="highlight">
                        {fragment}
                      </span>
                    ) : (
                      fragment
                    ) // eslint-disable-line
                )}
            </span>
          ) : (
            text
          );
        }
      },
      {
        title: 'Year',
        dataIndex: 'year',
        key: 'year',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.year - b.year
      },
      {
        title: 'Category',
        dataIndex: 'categoryName',
        key: 'categoryName',
        filters: categoryFilters,
        filterMultiple: false,
        onFilter: (value, cat) => cat.categoryName.indexOf(value) === 0,
        sorter: (a, b) => a.categoryName.length - b.categoryName.length
      },
      {
        title: 'Rating',
        dataIndex: 'rating',
        key: 'rating',
        editable: true,
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.rating - b.rating
      },
      {
        title: 'Comment',
        dataIndex: 'comment',
        key: 'comment',
        editable: true
      },
      {
        title: '',
        key: 'edit',
        render: (text, movie) => {
          const editable = this.isEditing(movie);
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <span
                        className="link"
                        onClick={() => this.updateMovie(form, movie.id)}
                        style={{ marginRight: 8 }}
                      >
                        Save
                      </span>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="Cancel editing?"
                    onConfirm={() => onEditCancel(movie.id)}
                  >
                    <span className="link">Cancel</span>
                  </Popconfirm>
                </span>
              ) : (
                <span className="link" onClick={() => onEdit(movie.id)}>
                  <Icon type="edit" />
                </span>
              )}
            </div>
          );
        }
      },
      {
        title: '',
        key: 'delete',
        render: movie => {
          return (
            <Popconfirm
              title="Are you sure you want to delete this movie?"
              onConfirm={() => removeMovie(movie.id)}
            >
              <span className="link">
                <Icon type="delete" />
              </span>
            </Popconfirm>
          );
        }
      }
    ];

    const columns = columnsData.map(col => {
      if (!col.editable) return col;

      return {
        ...col,
        onCell: movie => ({
          movie,
          inputType:
            col.dataIndex === 'year' || col.dataIndex === 'rating'
              ? 'number'
              : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(movie)
        })
      };
    });

    return (
      <Table
        components={components}
        columns={columns}
        dataSource={movies}
        rowKey={movie => movie.id}
        rowClassName="editable-row"
      />
    );
  }
}

export default connect(
  null,
  { removeMovie, editMovie }
)(withRouter(MovieTable));
