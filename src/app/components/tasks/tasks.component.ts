import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from "../task-item/task-item.component";
import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
    selector: 'app-tasks',
    standalone: true,
    templateUrl: './tasks.component.html',
    styleUrl: './tasks.component.css',
    imports: [CommonModule, TaskItemComponent, AddTaskComponent]
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService){
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks);
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => (this.tasks = this.tasks.filter((t) => t.id !== task.id)))
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder
    console.log('toggleReminder reminder value: ', task.reminder)
    this.taskService.updateTaskReminder(task).subscribe()
  }

  addTask(task: Task) {
    console.log('task added: ',task)
    this.taskService.addTask(task).subscribe((task) => (this.tasks.push(task)))
  }

}
