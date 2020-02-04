// import * as _ from 'lodash';

const initialState = { 
	isFetching: false,
	vehicles: [], 
};

export default function(state = initialState, action) {
	const clone = Object.assign({}, state);
	switch (action.type) {
		case 'fetch-data':
			console.log('fetched', action);
	// 		const actionName = action.name.toLowerCase();
	// 		const filteredList = Object.assign([], clone.taskList);
			
	// 		filteredList.forEach((task, id) => {
	// 			const taskName = task.name ? task.name.toLowerCase() : '';
	// 			const isPresent = taskName.indexOf(actionName) !== -1;
	// 			if (actionName) {
	// 				if (isPresent) {
	// 					filteredList[id].visible = true;
	// 				} else {
	// 					filteredList[id].visible = false;
	// 				}
	// 			} else {
	// 				filteredList[id].visible = true;
	// 			}
	// 		})
	// 		clone.taskList = filteredList;
			return clone;
	// 	case 'removeTask':
	// 		const removeRow = _.findIndex(clone.taskList, { id: clone.taskToDelete });
	// 		const newList = Object.assign([], clone.taskList);
	// 		newList.splice(removeRow, 1)
	// 		clone.showRemoveModal = !clone.showRemoveModal;	
	// 		clone.taskList = newList;
	// 		clone.taskToDelete = '';
	// 		return clone;
	// 	case 'toggleRemoveModal':
	// 		const removeModal = clone.showRemoveModal;
	// 		clone.showRemoveModal = !removeModal;
	// 		clone.taskToDelete = action.id;
	// 		return clone;
	// 	case 'doneTask':
	// 		const doneRow = _.findIndex(clone.taskList, { id: action.params.id });
	// 		const newTaskList = Object.assign([], clone.taskList);
	// 		_.set(newTaskList, [doneRow, 'done'],  action.params.done);
	// 		clone.taskList = newTaskList;
	// 		return clone;
	// 	case 'changeTask':
	// 		const changedRow = _.findIndex(clone.taskList, { id: action.params.id });
	// 		_.set(clone.taskList, [changedRow, 'name'],  action.params.value);
	// 		return clone;
	// 	case 'addNewTask':
	// 		const task = action.task;
	// 		if (_.findIndex(clone.taskList, { name: task }) === -1) {
	// 			const newId = clone.taskList.length ? _.maxBy(clone.taskList, 'id').id + 1 : 1;
	// 			const newTask = {
	// 				name: task, 
	// 				done: false, 
	// 				visible: true,
	// 				id: newId,
	// 			}
	// 			const newTaskList = clone.taskList.concat(newTask);
	// 			clone.taskList = newTaskList; 
	// 		}
	// 		return clone;
		default:
			return state;
	}
}