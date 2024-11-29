import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../service/chat.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatMessage } from '../../Authentication/chat-message';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit{
  messageInput: string="";
  currentUserId: string = ""; 
  otherUserId: string = "";  
  roomId: string = "";       
  messageList: any[] = [];
  user: any = { firstName: '', lastName: '', email: '', img_profile: '' };
  constructor(private chat: ChatService, private route: ActivatedRoute, private authService: AuthService){

  }

  ngOnInit(): void {
    this.currentUserId = this.route.snapshot.params['userId'];
    this.otherUserId = this.getCurrentUserIdFromToken();
    this.roomId = this.chat.generateRoomId(this.currentUserId, this.otherUserId);
      this.chat.joinRoom(this.roomId);
      this.listenerMessage();
      this.authService.getUserById(this.currentUserId).subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (err) => {
          console.error('Error al obtener la información del usuario', err);
        }
      });
     
  }


  

  sendMessage(){
    const chatMessage = {
      message : this.messageInput,
      user : this.currentUserId
    }as ChatMessage
    this.chat.sendMessage(this.roomId, chatMessage);
    this.messageInput = '';
  }

  listenerMessage(){
    this.chat.getMessageSubject().subscribe((message: any)=> {
      this.messageList = message.map((item: any)=>({
        ...item,
        message_side: item.user === this.currentUserId ? 'sender': 'receiver'
      }))
    });
  }

  private getCurrentUserIdFromToken(): string {
    const token = localStorage.getItem('authToken');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId;
    }
    return '';
  }
}
