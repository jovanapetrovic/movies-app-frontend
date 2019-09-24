import React, { Component } from "react";
import "./Movies.css";
import { EditableContext } from "./MovieTable";
import { Input, InputNumber, Form } from "antd";

const FormItem = Form.Item;

class EditableCell extends Component {
	getInput = () => {
		if (this.props.inputType === "number") {
			return <InputNumber />;
		}
		return <Input />;
	};

	render() {
		const {
			editing,
			dataIndex,
			title,
			inputType,
			movie,
			index,
			...restProps
		} = this.props;
		return (
			<EditableContext.Consumer>
				{form => {
					const { getFieldDecorator } = form;
					return (
						<td {...restProps}>
							{editing ? (
								<FormItem style={{ margin: 0 }}>
									{getFieldDecorator(dataIndex, {
										rules: [
											{
												required: true,
												message: `Please input ${title}!`
											}
										],
										initialValue: movie[dataIndex]
									})(this.getInput())}
								</FormItem>
							) : (
								restProps.children
							)}
						</td>
					);
				}}
			</EditableContext.Consumer>
		);
	}
}

export default EditableCell;
