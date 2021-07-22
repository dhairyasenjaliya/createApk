import {action, select, thunk} from 'easy-peasy';
import AsyncStorage from '@react-native-community/async-storage'

const actions = {
  // ACTIONS
  setBookmarks: action((state, payload) => {
    state.bookmarks = payload;
  }),

  addBookmark : action((state, payload) => {
    const temp = [
      payload,
      ...state.bookmarks
    ]
    state.bookmarks = temp;

    AsyncStorage.setItem('bookmarks', JSON.stringify(temp))
  }),

  removeBookmark : action((state, payload) => {
    var temp = [];
    state.bookmarks.map((b, index)=>{
      if(!(b.source.id == payload.source.id && b.title == payload.title && b.author == payload.author)){
        temp.push(b)
      }
    })
    state.bookmarks = temp;
    AsyncStorage.setItem('bookmarks', JSON.stringify(temp))
  }),

  initialBookmark: action((state, payload) => {
    state.bookmarks = [
      {
        "source": {
            "id": "wired",
            "name": "Wired"
        },
        "author": "Arielle Pardes",
        "title": "Pet Startups Are Having a Field Day",
        "description": "The pandemic ushered in a new wave of pet owners—and unleashed business opportunities for companies that cater to them.",
        "url": "https://www.wired.com/story/pet-startups-are-having-field-day/",
        "urlToImage": "https://media.wired.com/photos/60e4ec2f3082cb0dcce32bad/191:100/w_1280,c_limit/Business-pandemic-dog-startups-1317845849.jpg",
        "publishedAt": "2021-07-12T11:00:00Z",
        "content": "Over the Fourth of July weekend, Americans filled airports and highways nearly as much as on holidays before the pandemic. For many people, the busy travel weekend will be followed by a return to the… [+3476 chars]"
    },
    {
        "source": {
            "id": "techcrunch",
            "name": "TechCrunch"
        },
        "author": "Frederic Lardinois",
        "title": "Microsoft launches Windows 365",
        "description": "Microsoft today launched Windows 365, a service that gives businesses the option to easily let their employees access a Windows 10 desktop from the cloud (with Windows 11 coming once it’s generally available). Think game streaming, but for your desktop. It’ll…",
        "url": "http://techcrunch.com/2021/07/14/microsoft-launches-windows-365/",
        "urlToImage": "https://techcrunch.com/wp-content/uploads/2021/07/cloud-pc.jpg?w=764",
        "publishedAt": "2021-07-14T16:00:14Z",
        "content": "Microsoft today launchedWindows 365, a service that gives businesses the option to easily let their employees access a Windows 10 desktop from the cloud (with Windows 11 coming once it’s generally av… [+3018 chars]"
    }];
  })
};

const thunks = {
  // THUNKS
  initial: thunk(async (actions, payload) => {
    // Notice that the thunk will receive the actions allowing you to dispatch
    // other actions after you have performed your side effect.
    try {
      const books = await AsyncStorage.getItem('bookmarks')
  
      if (books !== null) {
        actions.setBookmarks(JSON.parse(books));
      }
    } catch (e) {
      console.log('Failed to fetch the data from storage')
    }
  }),
};

const BookmarkModel = {
  ...actions,
  ...thunks,
  bookmarks: []
};

export default BookmarkModel;
