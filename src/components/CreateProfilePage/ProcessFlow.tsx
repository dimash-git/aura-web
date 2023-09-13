import { useEffect, useState } from 'react'
import ProcessItem from "./ProcessItem"
import styles from './styles.module.css'

interface Task {
  (): Promise<void>
}

type ProcessItem = {
  task: Task
  label: string
}

type ProcessFlowProps = {
  items: ProcessItem[]
  onDone: () => void
}

enum ProcessStatus {
  Idle,
  Pending,
  Done,
}

const createChaining = (tasks: Task[], callback: (idx: number) => void) => {
  return tasks.reduce((chain, task, idx) => {
    return chain.then(task).then(()=> callback(idx))
  }, Promise.resolve())
}

const getMultiplier = (currentIdx: number, length: number): number => {
  return Math.max(length - (currentIdx + 1) - 1, 0)
}

const calculateTop = (currentIdx: number, length: number): number => {
  const itemHeight = 63
  return getMultiplier(currentIdx, length) * itemHeight
}

function ProcessFlow({ items, onDone }: ProcessFlowProps): JSX.Element {
  const [status, setStatus] = useState(ProcessStatus.Idle)
  const [doneTaskIdx, setDoneTaskIdx] = useState(-1)
  const tasks = items.map(({ task }) => task)

  useEffect(() => {
    if (status !== ProcessStatus.Idle) return
    setStatus(ProcessStatus.Pending)
    createChaining(tasks, setDoneTaskIdx)
      .then(() => setStatus(ProcessStatus.Done))
      .then(() => onDone())
  }, [status, tasks, onDone])

  const toItems = ({ label }: ProcessItem, idx: number): JSX.Element => {
    return <ProcessItem
      key={idx}
      label={label}
      top={calculateTop(doneTaskIdx, items.length)}
      isDone={idx <= doneTaskIdx}
    />
  }
  return (
    <div className={`${styles['process-items']} mt-24`}>
      {items.map(toItems)}
    </div>
  )
}

export default ProcessFlow
