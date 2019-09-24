import React from 'react';
import { Form, Input, Icon } from 'antd';
import './styles.css';

const FormItem = Form.Item;

export default function PollOption({
  option,
  optionNumber,
  handleOptionChange,
  removeOption
}) {
  return (
    <FormItem
      validateStatus={option.validateStatus}
      help={option.errorMsg}
      className="poll-form-row"
    >
      <Input
        placeholder={'Option ' + (optionNumber + 1)}
        size="large"
        value={option.text}
        className={optionNumber > 1 ? 'custom-option' : null}
        onChange={event => handleOptionChange(event, optionNumber)}
      />
      {optionNumber > 1 ? (
        <Icon
          className="dynamic-delete-button"
          type="close"
          disabled={optionNumber <= 1}
          onClick={() => removeOption(optionNumber)}
        />
      ) : null}
    </FormItem>
  );
}
