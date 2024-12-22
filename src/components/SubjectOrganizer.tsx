// import React, { useState, useMemo } from "react";
// import { Clock, Star, Book, TrendingUp } from "lucide-react";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// interface Subject {
//   $id: string;
//   title: string;
//   lastOpened: string;
//   completedChapters: number;
//   totalChapters: number;
// }

// interface SubjectOrganizerProps {
//   subjects: Subject[];
//   onSubjectSelect: (subject: Subject) => void;
// }

// const SubjectOrganizer: React.FC<SubjectOrganizerProps> = ({
//   subjects,
//   onSubjectSelect,
// }) => {
//   const [sortMethod, setSortMethod] = useState<string>("recent");

//   const organizedSubjects = useMemo(() => {
//     const now = new Date();

//     return {
//       recent: [...subjects].sort(
//         (a, b) =>
//           new Date(b.lastOpened).getTime() - new Date(a.lastOpened).getTime()
//       ),

//       progress: [...subjects].sort(
//         (a, b) =>
//           b.completedChapters / b.totalChapters -
//           a.completedChapters / a.totalChapters
//       ),

//       active: subjects.filter((subject) => {
//         const lastOpenedDate = new Date(subject.lastOpened);
//         const daysSinceLastOpened = Math.floor(
//           (now - lastOpenedDate) / (1000 * 60 * 60 * 24)
//         );
//         return daysSinceLastOpened <= 7;
//       }),

//       suggested: subjects.filter((subject) => {
//         const progress = subject.completedChapters / subject.totalChapters;
//         return progress > 0.25 && progress < 0.75;
//       }),
//     };
//   }, [subjects]);

//   return (
//     <div className='w-full max-w-4xl mx-auto'>
//       <Tabs defaultValue='recent'>
//         <TabsList className='grid w-full grid-cols-4 gap-2'>
//           <TabsTrigger value='recent' onClick={() => setSortMethod("recent")}>
//             <div className='flex items-center justify-center space-x-2'>
//               <Clock className='w-4 h-4' />
//               <span>Recent</span>
//             </div>
//           </TabsTrigger>
//           <TabsTrigger
//             value='progress'
//             onClick={() => setSortMethod("progress")}
//           >
//             <div className='flex items-center justify-center space-x-2'>
//               <TrendingUp className='w-4 h-4' />
//               <span>Progress</span>
//             </div>
//           </TabsTrigger>
//           <TabsTrigger value='active' onClick={() => setSortMethod("active")}>
//             <div className='flex items-center justify-center space-x-2'>
//               <Book className='w-4 h-4' />
//               <span>Active</span>
//             </div>
//           </TabsTrigger>
//           <TabsTrigger
//             value='suggested'
//             onClick={() => setSortMethod("suggested")}
//           >
//             <div className='flex items-center justify-center space-x-2'>
//               <Star className='w-4 h-4' />
//               <span>Suggested</span>
//             </div>
//           </TabsTrigger>
//         </TabsList>

//         <div className='mt-4'>
//           <TabsContent value='recent'>
//             <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
//               {organizedSubjects.recent.map((subject) => (
//                 <Card
//                   key={subject.$id}
//                   onClick={() => onSubjectSelect(subject)}
//                   className='cursor-pointer hover:shadow-lg transition-shadow'
//                 >
//                   <CardHeader>
//                     <CardTitle>{subject.title}</CardTitle>
//                     <CardDescription>
//                       Last opened: {subject.lastOpened}
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className='w-full bg-gray-200 rounded-full h-2.5'>
//                       <div
//                         className='bg-blue-600 h-2.5 rounded-full'
//                         style={{
//                           width: `${
//                             (subject.completedChapters /
//                               subject.totalChapters) *
//                             100
//                           }%`,
//                         }}
//                       ></div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>

//           <TabsContent value='progress'>
//             <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
//               {organizedSubjects.progress.map((subject) => (
//                 <Card
//                   key={subject.$id}
//                   onClick={() => onSubjectSelect(subject)}
//                   className='cursor-pointer hover:shadow-lg transition-shadow'
//                 >
//                   <CardHeader>
//                     <CardTitle>{subject.title}</CardTitle>
//                     <CardDescription>
//                       Progress:{" "}
//                       {(
//                         (subject.completedChapters / subject.totalChapters) *
//                         100
//                       ).toFixed(2)}
//                       %
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className='w-full bg-gray-200 rounded-full h-2.5'>
//                       <div
//                         className='bg-blue-600 h-2.5 rounded-full'
//                         style={{
//                           width: `${
//                             (subject.completedChapters /
//                               subject.totalChapters) *
//                             100
//                           }%`,
//                         }}
//                       ></div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>

//           <TabsContent value='active'>
//             <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
//               {organizedSubjects.active.map((subject) => (
//                 <Card
//                   key={subject.$id}
//                   onClick={() => onSubjectSelect(subject)}
//                   className='cursor-pointer hover:shadow-lg transition-shadow'
//                 >
//                   <CardHeader>
//                     <CardTitle>{subject.title}</CardTitle>
//                     <CardDescription>Active recently</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className='w-full bg-gray-200 rounded-full h-2.5'>
//                       <div
//                         className='bg-blue-600 h-2.5 rounded-full'
//                         style={{
//                           width: `${
//                             (subject.completedChapters /
//                               subject.totalChapters) *
//                             100
//                           }%`,
//                         }}
//                       ></div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>

//           <TabsContent value='suggested'>
//             <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
//               {organizedSubjects.suggested.map((subject) => (
//                 <Card
//                   key={subject.$id}
//                   onClick={() => onSubjectSelect(subject)}
//                   className='cursor-pointer hover:shadow-lg transition-shadow'
//                 >
//                   <CardHeader>
//                     <CardTitle>{subject.title}</CardTitle>
//                     <CardDescription>Suggested for you</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className='w-full bg-gray-200 rounded-full h-2.5'>
//                       <div
//                         className='bg-blue-600 h-2.5 rounded-full'
//                         style={{
//                           width: `${
//                             (subject.completedChapters /
//                               subject.totalChapters) *
//                             100
//                           }%`,
//                         }}
//                       ></div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>
//         </div>
//       </Tabs>
//     </div>
//   );
// };

// export default SubjectOrganizer;
