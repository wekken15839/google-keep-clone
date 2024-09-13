const users = {
  users: {
    userId1: {
      id: "userId1",
      name: "Jean Carlos",
      email: "jean@example.com",
      noteIds: ["noteId1", "noteId2"],
      labelIds: ["labelId1", "labelId2"],
      memoryIds: ["memoryId1"],
    },
    userId2: {
      id: "userId2",
      name: "User Two",
      email: "user2@example.com",
      noteIds: ["noteId3"],
      labelIds: ["labelId3"],
      memoryIds: [],
    },
  },
};

const notes = {
  noteId1: {
    id: "noteId1",
    content: "Primera nota",
    labelId: "labelId1",
    userId: "userId1",
    createdAt: "2024-08-15T12:00:00Z",
  },
  noteId2: {
    id: "noteId2",
    content: "Segunda nota",
    labelId: "labelId2",
    userId: "userId1",
    createdAt: "2024-08-16T12:00:00Z",
  },
  noteId3: {
    id: "noteId3",
    content: "Tercera nota",
    labelId: "labelId3",
    userId: "userId2",
    createdAt: "2024-08-17T12:00:00Z",
  },
};

const labels = {
  labels: {
    labelId1: {
      id: "labelId1",
      name: "Trabajo",
      noteIds: ["noteId1"],
    },
    labelId2: {
      id: "labelId2",
      name: "Personal",
      noteIds: ["noteId2"],
    },
    labelId3: {
      id: "labelId3",
      name: "Ideas",
      noteIds: ["noteId3"],
    },
  },
};
