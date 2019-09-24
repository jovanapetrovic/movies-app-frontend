import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Input,
  InputNumber,
  Form,
  Select,
  Modal,
  Button
} from 'antd';
import {
  MOVIE_NAME_MAX_LENGTH,
  MOVIE_YEAR_MIN,
  MOVIE_YEAR_MAX,
  MOVIE_RATING_MIN,
  MOVIE_RATING_MAX,
  MOVIE_COMMENT_MAX_LENGTH
} from '../../constants';
import { addMovie } from '../../store/actions/movies';
import './NewMovie.css';

const { TextArea } = Input;
const Option = Select.Option;
const FormItem = Form.Item;

class NewMovie extends Component {
  addNewMovie = event => {
    event.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) return;

      const movieData = {
        name: values.name,
        year: values.year,
        categoryName: values.categoryName,
        rating: values.rating,
        comment: values.comment
      };

      this.props.form.resetFields();
      this.props.onModalCancel();
      this.props.addMovie(movieData);
    });
  };

  render() {
    const { visible, onModalCancel, form, categories } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal
        title="Which movie did you watch?"
        visible={visible}
        onCancel={onModalCancel}
        footer={[
          <Button
            form="new-movie-form"
            key="submit"
            htmlType="submit"
            type="primary"
            size="large"
            className="add-movie-form-button"
          >
            Add movie to list
          </Button>
        ]}
      >
        <Form
          id="new-movie-form"
          onSubmit={this.addNewMovie}
          className="create-movie-form"
        >
          <FormItem label="Name">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Please input movie name!'
                },
                {
                  max: MOVIE_NAME_MAX_LENGTH,
                  message: 'Maximum 50 characters allowed!'
                }
              ]
            })(<Input placeholder="Add movie name" size="large" />)}
          </FormItem>
          <FormItem label="Category">
            {getFieldDecorator('categoryName', {
              initialValue: 'Action'
            })(
              <Select size="large">
                {categories.map(c => (
                  <Option key={c.name}>{c.name}</Option>
                ))}
              </Select>
            )}
          </FormItem>

          <Row>
            <Col span={12}>
              <FormItem label="Year">
                {getFieldDecorator('year', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input year of production!'
                    }
                  ]
                })(
                  <InputNumber
                    size="large"
                    min={MOVIE_YEAR_MIN}
                    max={MOVIE_YEAR_MAX}
                    style={{ width: 150 }}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Your rating">
                {getFieldDecorator('rating', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your rating!'
                    }
                  ]
                })(
                  <InputNumber
                    size="large"
                    min={MOVIE_RATING_MIN}
                    max={MOVIE_RATING_MAX}
                    style={{ width: 150 }}
                  />
                )}
              </FormItem>
            </Col>
          </Row>

          <FormItem label="Your comment">
            {getFieldDecorator('comment', {
              rules: [
                {
                  required: true,
                  message: 'Please input your comment!'
                },
                {
                  max: MOVIE_COMMENT_MAX_LENGTH,
                  message: 'Maximum 150 characters allowed!'
                }
              ]
            })(
              <TextArea
                size="large"
                placeholder="Add your comment"
                style={{ fontSize: '16px' }}
                autosize={{ minRows: 3, maxRows: 6 }}
              />
            )}
          </FormItem>
          <FormItem className="movie-form-row" />
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(
  connect(
    null,
    { addMovie }
  )(NewMovie)
);
