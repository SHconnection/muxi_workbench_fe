import React from 'react'
import PropTypes from 'prop-types'
import { HtmlEditor, MenuBar } from '@aeaton/react-prosemirror'
import { options, menu } from '@aeaton/react-prosemirror-config-default'

const CustomEditor = ({ value, onChange }) => (
  <HtmlEditor
    options={options}
    value={value}
    onChange={onChange}
    render={({ editor, state, dispatch }) => (
      <div>
        <MenuBar menu={menu} state={state} dispatch={dispatch} />
        {editor}
      </div>
    )}
  />
)

CustomEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
}

CustomEditor.defaultProps = {
  value: '',
  onChange: () => {}
}


export default CustomEditor
