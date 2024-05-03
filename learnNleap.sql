

CREATE DATABASE learnNleap;

use learnNleap;

CREATE TABLE Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Password VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL
);

CREATE TABLE Profile(
    UserID INT,
    UserName VARCHAR(200) NOT NULL,
    CollegeName VARCHAR(50) NOT NULL,
    UserAddress VARCHAR(100) NOT NULL,
    YearOfGraduation INT(4) NOT NULL,
    MobileNo INT(15) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)

)

CREATE TABLE Companies (
    CompanyID INT PRIMARY KEY AUTO_INCREMENT,
    CompanyName VARCHAR(255) NOT NULL,
    Description TEXT,
    ContactEmail VARCHAR(255) NOT NULL
);

CREATE TABLE Internships (
    InternshipID INT PRIMARY KEY AUTO_INCREMENT,
    CompanyID INT,
    Title VARCHAR(255) NOT NULL,
    Description TEXT,
    Requirements TEXT,
    Deadline DATE,
    FOREIGN KEY (CompanyID) REFERENCES Companies(CompanyID)
);

CREATE TABLE Tasks (
    TaskID INT PRIMARY KEY AUTO_INCREMENT,
    InternshipID INT,
    TaskDescription TEXT,
    Status ENUM('assigned', 'completed', 'approved') NOT NULL,
    FOREIGN KEY (InternshipID) REFERENCES Internships(InternshipID)
);

CREATE TABLE Skills (
    SkillID INT PRIMARY KEY AUTO_INCREMENT,
    SkillName VARCHAR(255) NOT NULL
);

CREATE TABLE UserSkills (
    UserID INT,
    SkillID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (SkillID) REFERENCES Skills(SkillID)
);

CREATE TABLE Points (
    PointID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    Points INT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE Applications (
    ApplicationID INT PRIMARY KEY AUTO_INCREMENT,
    InternshipID INT,
    UserID INT,
    Status ENUM('pending', 'approved', 'rejected') NOT NULL,
    FOREIGN KEY (InternshipID) REFERENCES Internships(InternshipID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE Quizzes (
    QuizID INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(255) NOT NULL,
    Description TEXT,
    TotalPoints INT NOT NULL,
    TimeLimit INT, -- If quizzes are timed
    CreatedByCompanyID INT, -- To track which company created the quiz
    CreatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (CreatedByCompanyID) REFERENCES Companies(CompanyID)
);


CREATE TABLE QuizQuestions (
    QuestionID INT PRIMARY KEY AUTO_INCREMENT,
    QuizID INT,
    QuestionText TEXT NOT NULL,
    FOREIGN KEY (QuizID) REFERENCES Quizzes(QuizID)
);

CREATE TABLE QuizOptions (
    OptionID INT PRIMARY KEY AUTO_INCREMENT,
    QuestionID INT,
    OptionText TEXT NOT NULL,
    IsCorrect BOOLEAN NOT NULL,
    FOREIGN KEY (QuestionID) REFERENCES QuizQuestions(QuestionID)
);

CREATE TABLE UserQuizAttempts (
    AttemptID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    QuizID INT,
    Score INT, -- User's score on the quiz
    TimeTaken INT, -- Time taken to complete the quiz (if applicable)
    AttemptedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (QuizID) REFERENCES Quizzes(QuizID)
);

CREATE TABLE UserQuizResponses (
    ResponseID INT PRIMARY KEY AUTO_INCREMENT,
    AttemptID INT,
    QuestionID INT,
    SelectedOptionID INT,
    FOREIGN KEY (AttemptID) REFERENCES UserQuizAttempts(AttemptID),
    FOREIGN KEY (QuestionID) REFERENCES QuizQuestions(QuestionID),
    FOREIGN KEY (SelectedOptionID) REFERENCES QuizOptions(OptionID)
);

CREATE TABLE PremiumSubscriptions (
    SubscriptionID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT, -- User who subscribed to the premium version
    SubscriptionStartDate DATE,
    SubscriptionEndDate DATE, -- End date of the premium subscription
    PaymentAmount DECIMAL(10, 2) NOT NULL, -- Payment amount for the subscription
    PaymentDate DATE, -- Date of payment
    PaymentStatus ENUM('pending', 'completed') DEFAULT 'pending', -- Payment status
    PremiumCoursesAreFree BOOLEAN DEFAULT TRUE, -- Indicates if premium subscribers get free access to all courses
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE Courses (
    CourseID INT PRIMARY KEY AUTO_INCREMENT,
    CourseName VARCHAR(255) NOT NULL,
    Desp TEXT,
    InstructorID INT, -- ID of the instructor teaching the course
    CourseStartDate DATE,
    CourseEndDate DATE,
    IsActive BOOLEAN DEFAULT TRUE -- Indicates whether the course is active or not
);

CREATE TABLE UserEnrollments (
    EnrollmentID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    CourseID INT,
    EnrollmentDate DATE, -- Date when the user enrolled in the course
    IsPremium BOOLEAN DEFAULT FALSE, -- Indicates if the user is a premium subscriber
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
);

CREATE TABLE Exams (
    ExamID INT PRIMARY KEY AUTO_INCREMENT,
    CourseID INT,
    Title VARCHAR(255) NOT NULL,
    Description TEXT,
    PassPercentage DECIMAL(5, 2) NOT NULL, -- Minimum pass percentage for the exam
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
);

CREATE TABLE Questions (
    QuestionID INT PRIMARY KEY AUTO_INCREMENT,
    ExamID INT,
    QuestionText TEXT NOT NULL,
    FOREIGN KEY (ExamID) REFERENCES Exams(ExamID)
);

CREATE TABLE Options (
    OptionID INT PRIMARY KEY AUTO_INCREMENT,
    QuestionID INT,
    OptionText TEXT NOT NULL,
    IsCorrect BOOLEAN NOT NULL, -- Indicates if the option is the correct answer
    FOREIGN KEY (QuestionID) REFERENCES Questions(QuestionID)
);

CREATE TABLE UserExamAttempts (
    AttemptID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    ExamID INT,
    Score DECIMAL(5, 2) NOT NULL, -- User's score on the exam
    AttemptedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ExamID) REFERENCES Exams(ExamID)
);

CREATE TABLE ECertificates (
    CertificateID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    CourseID INT,
    IssueDate DATE, -- Date when the e-certificate was issued
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
);

-- Mentorship
CREATE TABLE Mentorship (
    MentorshipID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT, -- User requesting mentorship
    MentorID INT, -- ID of the mentor
    RequestedDate DATE, -- Date when mentorship is requested
    IsPremiumUser BOOLEAN DEFAULT FALSE, -- Indicates if the user is a premium subscriber
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (MentorID) REFERENCES Users(UserID)
);

-- Courses Videos
CREATE TABLE CourseVideos (
    VideoID INT PRIMARY KEY AUTO_INCREMENT,
    CourseID INT,
    VideoTitle VARCHAR(255) NOT NULL,
    VideoURL VARCHAR(255) NOT NULL, -- URL of the video
    IsFree BOOLEAN DEFAULT TRUE, -- Indicates if the video is free
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
);

-- Leaderboard
CREATE TABLE Leaderboard (
    LeaderboardID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    Points INT NOT NULL,
    Rank_No INT, -- Calculated rank based on points
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

use learnNleap;

-- Insert the following course names into the "Courses" table
INSERT INTO Courses (CourseName, Decp, InstructorID, CourseStartDate, CourseEndDate, IsActive) VALUES
('Android App Development', 'Learn to develop Android applications', 1, '2023-01-01', '2023-03-01', TRUE),
('Angular', 'Master the Angular framework for web development', 2, '2023-02-15', '2023-04-15', TRUE),
('AR/VR', 'Explore Augmented and Virtual Reality technologies', 3, '2023-03-10', '2023-05-10', TRUE),
('Cloud Computing with AWS', 'Learn cloud computing with Amazon Web Services', 4, '2023-04-01', '2023-06-01', TRUE),
('Core Java', 'Fundamentals of Java programming', 5, '2023-05-15', '2023-07-15', TRUE),
('Data Structures and Algorithms', 'Master data structures and algorithm design', 6, '2023-06-01', '2023-08-01', TRUE),
('Ethical Hacking', 'Learn ethical hacking and cybersecurity', 7, '2023-07-15', '2023-09-15', TRUE);

select * from Courses;