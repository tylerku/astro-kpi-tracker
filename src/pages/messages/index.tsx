import React from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {PageWrapper, DropdownMenu, SettingsButton, BasicButton } from '../../components'

interface MessagesPageProps {}

const MessagesPage: React.FC<MessagesPageProps> = (props) => {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('router.query: ', router.query)
  }, [router.query])

  interface User {
    id: string;
    name: string;
    avatar: string;
    lastMessage?: string; // Add last message for preview
    lastMessageTime?: string;
    unread?: number;
  }

  interface Message {
      id: string;
      userId: string;
      text: string;
      timestamp: string;
  }

  const mockUsers: User[] = [
      {
          id: '1',
          name: 'Elon Musk',
          avatar: 'https://picsum.photos/id/237/40/40',
          lastMessage: 'Did you see my tweet?',
          lastMessageTime: '2 min ago',
          unread: 3,
      },
      {
          id: '2',
          name: 'Greta Thunberg',
          avatar: 'https://picsum.photos/id/238/40/40',
          lastMessage: "The climate is changing!",
          lastMessageTime: '1 hour ago',
          unread: 0
      },
      {
          id: '3',
          name: 'Bill Gates',
          avatar: 'https://picsum.photos/id/239/40/40',
          lastMessage: 'Investing in renewables.',
          lastMessageTime: '3 hours ago',
          unread: 2,
      },
      {
          id: '4',
          name: 'Vitalik Buterin',
          avatar: 'https://picsum.photos/id/240/40/40',
          lastMessage: 'Checking in on Ethereum...',
          lastMessageTime: '1 day ago',
          unread: 0,
      },
      {
          id: '5',
          name: 'Rihanna',
          avatar: 'https://picsum.photos/id/241/40/40',
          lastMessage: 'New album soon!',
          lastMessageTime: '2 days ago',
          unread: 5
      },
      {
          id: '6',
          name: 'LeBron James',
          avatar: 'https://picsum.photos/id/242/40/40',
          lastMessage: 'Lets go Lakers!',
          lastMessageTime: '1 week ago',
          unread: 0
      },
      {
          id: '7',
          name: 'Taylor Swift',
          avatar: 'https://picsum.photos/id/243/40/40',
          lastMessage: 'Surprise new song!',
          lastMessageTime: '3 weeks ago',
          unread: 1,
      },
      {
          id: '8',
          name: 'Linus Torvalds',
          avatar: 'https://picsum.photos/id/244/40/40',
          lastMessage: 'Kernel 6.8 released.',
          lastMessageTime: '1 month ago',
          unread: 0,
      }
  ];

  const mockMessages: { [userId: string]: Message[] } = {
      '1': [
          { id: 'm1', userId: '1', text: 'Hey Elon!', timestamp: '2024-07-24T10:00:00Z' },
          { id: 'm2', userId: 'self', text: 'Hey, what\'s up?', timestamp: '2024-07-24T10:02:00Z' },
          { id: 'm3', userId: '1', text: 'Just checking in.  Did you see my tweet about Mars?', timestamp: '2024-07-24T10:05:00Z' },
          { id: 'm4', userId: 'self', text: 'Yeah, looks ambitious!', timestamp: '2024-07-24T10:06:00Z' },
          { id: 'm5', userId: '1', text: 'We\'re going to get there one day.', timestamp: '2024-07-24T12:34:56Z' },
      ],
      '2': [
          { id: 'm6', userId: '2', text: 'Hi there!', timestamp: '2024-07-24T14:15:00Z' },
          { id: 'm7', userId: 'self', text: 'Hello Greta, how are things?', timestamp: '2024-07-24T14:16:00Z' },
          { id: 'm8', userId: '2', text: 'The climate is changing rapidly. We need to act now!', timestamp: '2024-07-24T14:20:00Z' },
      ],
      '3': [
          { id: 'm9', userId: '3', text: 'Hello!', timestamp: '2024-07-24T16:45:00Z' },
          { id: 'm10', userId: 'self', text: 'Hi Bill, what\'s new?', timestamp: '2024-07-24T16:46:00Z' },
          { id: 'm11', userId: '3', text: 'I\'m investing heavily in renewable energy solutions.', timestamp: '2024-07-24T17:00:00Z' },
      ],
      '4': [
          { id: 'm12', userId: '4', text: 'gm', timestamp: '2024-07-24T18:00:00Z' },
          { id: 'm13', userId: 'self', text: 'Good morning, Vitalik!', timestamp: '2024-07-24T18:01:00Z' },
          { id: 'm14', userId: '4', text: 'Checking in on the progress of Ethereum upgrades.', timestamp: '2024-07-24T18:30:00Z' },
      ],
      '5': [
          { id: 'm15', userId: '5', text: 'Hey, whats up?', timestamp: '2024-07-24T19:00:00Z' },
          { id: 'm16', userId: 'self', text: 'Hello Rihanna, how are you doing?', timestamp: '2024-07-24T19:01:00Z' },
          { id: 'm17', userId: '5', text: 'New album coming out soon!', timestamp: '2024-07-24T19:30:00Z' },
          { id: 'm18', userId: 'self', text: 'Awesome!', timestamp: '2024-07-24T19:31:00Z' },
          { id: 'm19', userId: '5', text: 'Yeah, its going to be great', timestamp: '2024-07-24T19:32:00Z' },
      ],
      '6': [
          { id: 'm20', userId: '6', text: 'Hey, how is it going?', timestamp: '2024-07-24T20:00:00Z' },
          { id: 'm21', userId: 'self', text: 'Hello LeBron, I am doing great!', timestamp: '2024-07-24T20:01:00Z' },
          { id: 'm22', userId: '6', text: 'Lets go Lakers! We are going to win this year.', timestamp: '2024-07-24T20:30:00Z' },
      ],
      '7': [
          { id: 'm23', userId: '7', text: 'Hi there!', timestamp: '2024-07-24T21:00:00Z' },
          { id: 'm24', userId: 'self', text: 'Hello Taylor, how are things?', timestamp: '2024-07-24T21:01:00Z' },
          { id: 'm25', userId: '7', text: 'I have a surprise new song for you all!', timestamp: '2024-07-24T21:30:00Z' },
      ],
      '8': [
          { id: 'm26', userId: '8', text: 'Hello!', timestamp: '2024-07-24T22:00:00Z' },
          { id: 'm27', userId: 'self', text: 'Hi Linus, what\'s new?', timestamp: '2024-07-24T22:01:00Z' },
          { id: 'm28', userId: '8', text: 'Kernel 6.8 has been released.', timestamp: '2024-07-24T22:30:00Z' },
      ],
  };

  return (
    <PageWrapper>
      <div className='h-full w-full bg-darkGray flex flex-row'>
        <div className='h-full w-full p-10 flex-grow flex flex-col space-y-8'>
          <div className='text-bold '>
            HELLO THERE
          </div>
        </div>
        </div>
    </PageWrapper>
  )
}

export default MessagesPage;
