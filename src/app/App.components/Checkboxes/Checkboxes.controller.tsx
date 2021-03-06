import * as PropTypes from 'prop-types'
import * as React from 'react'
import { useState, useEffect } from 'react'

import { CheckboxesView } from './Checkboxes.view'

type CheckboxesProps = {
  items: string[]
  proposedResponses?: string[]
  onUpdate: (selected: string[]) => void
}

export const Checkboxes = ({ items, onUpdate, proposedResponses }: CheckboxesProps) => {
  const [selected, setSelected] = useState<string[]>([])

  const clickCallback = (e: any) => {
    let value = e.target.value
    let newSelected = selected

    if (newSelected.indexOf(value) >= 0) newSelected = newSelected.filter((item: string) => item !== value)
    else newSelected.push(value)

    setSelected(newSelected)
    onUpdate(newSelected)
  }

  useEffect(() => {
    if (!proposedResponses?.length) {
      setSelected(() => [])
    }
  }, [proposedResponses])

  return <CheckboxesView items={items} clickCallback={clickCallback} selected={selected} />
}

Checkboxes.propTypes = {
  items: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
}

Checkboxes.defaultProps = {}
