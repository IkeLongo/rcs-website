import { useState } from 'react';
import Main from './main';
import Sub from './sub';

const people = [
  {
    memberName: 'John Doe',
    position: 'CEO',
    imageRoute: '/Image 1.jpg',
    imageDescription: 'Team member 1',
    bgImageClass: 'bg-photo-1',
    top: '0',
    right: '160px',
  },
  {
    memberName: 'Jane Smith',
    position: 'CTO',
    imageRoute: '/Image 2.jpg',
    imageDescription: 'Team member 2',
    bgImageClass: 'bg-photo-2',
    top: '0',
    right: '130px',
  },
  {
    memberName: 'Alice Johnson',
    position: 'CFO',
    imageRoute: '/Image 3.jpg',
    imageDescription: 'Team member 3',
    bgImageClass: 'bg-photo-3',
    top: '0',
    right: '130px',
  },
  {
    memberName: 'Bob Brown',
    position: 'COO',
    imageRoute: '/Image 4.jpg',
    imageDescription: 'Team member 4',
    bgImageClass : 'bg-photo-4',
    top: '0',
    right: '120px',
  },
  {
    memberName: 'Charlie Davis',
    position: 'CMO',
    imageRoute: '/Image 5.jpg',
    imageDescription: 'Team member 5',
    bgImageClass: 'bg-photo-5',
    top: '0',
    right: '130px',
  },
];

export default function Profiles() {
  const [mainProps, setMainProps] = useState(people[0]);
  const [subProps, setSubProps] = useState(people.slice(1));

  const handleSubClick = (index) => {
    const newSubProps = [...subProps];
    const clickedSubProps = newSubProps[index];

    // Swap the properties
    newSubProps[index] = mainProps;

    setMainProps(clickedSubProps);
    setSubProps(newSubProps);
  };

  return (
    <div className="flex flex-col w-full gap-4 h-full">
      <Main 
        memberName={mainProps.memberName}
        position={mainProps.position}
        bgImageClass={mainProps.bgImageClass}
      />
      <div className="flex w-full aspect-square gap-1">
        {subProps.map((props, index) => (
          <Sub
            key={index}
            imageRoute={props.imageRoute}
            imageDescription={props.imageDescription}
            top={props.top}
            right={props.right}
            onClick={() => handleSubClick(index)}
          />
        ))}
      </div>
    </div>
  );
}