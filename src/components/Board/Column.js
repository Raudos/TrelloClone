import React from 'react';

import Task from "components/Board/Task";
import TaskReceiver from "components/Board/TaskReceiver";

export default props => {
  const { column, columnsIndex, handleTaskDrop } = props;

  return (
    <div className="column">
      {column.name}

      {column.tasks.map((task, index) => {
        if (index === column.tasks.length - 1) {
          return (
            <React.Fragment key={task.id}>
              <TaskReceiver associatedTask={task} tasksIndex={index} columnsIndex={columnsIndex} handleTaskDrop={handleTaskDrop} />

              <Task task={task} tasksIndex={index} columnsIndex={columnsIndex} />

              <TaskReceiver associatedTask={task} tasksIndex={index} columnsIndex={columnsIndex} handleTaskDrop={handleTaskDrop} last />
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={task.id}>
            <TaskReceiver associatedTask={task} tasksIndex={index} columnsIndex={columnsIndex} handleTaskDrop={handleTaskDrop} />

            <Task task={task} tasksIndex={index} columnsIndex={columnsIndex} />
          </React.Fragment>
        );
      })}

      {column.tasks.length ?
        null

        :

        <TaskReceiver columnsIndex={columnsIndex} handleTaskDrop={handleTaskDrop} dummy />
      }
    </div>
  );
};
