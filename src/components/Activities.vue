<template>
  <div>
    <header>
      <img :src="photo">
      <span>{{name}}</span>
      <span>({{email}})</span>
      <button @click='logOut'>Log out</button>
    </header>
    <ul class="activities">
      <li :key="key" v-for="(value, key) in activities">
        <time>{{activities[key][0].createdAt.seconds | formatDate }}</time>
        <ul>
          <li :key="activity.id" v-for="activity in activities[key]">
            <span  class="type">{{ activity.prettyType }}</span> - <span class="body">{{activity.child}}, {{ activity.body }}</span>
            <img :src="activity.photoURL" />
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from 'firebase'
import 'firebase/firestore'
import { formatDate, dateKey } from '../helpers/date'

export default {
  data() {
    return {
      photo: '',
      userId: '',
      name: '',
      email: '',
      user: {},
      activities: []
    }
  },
  // watch: {
  //   activities: function(_el) {
  //     console.log('watch', _el);
  //     this.$forceUpdate();
  //   },
  // },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user
        this.name = this.user.displayName
        this.email = this.user.email
        this.photo = this.user.photoURL
        this.userId = this.user.uid
        this.activities = {}

        var db = firebase.firestore()
        const settings = { timestampsInSnapshots: true }
        db.settings(settings)

        db
          .collection('users')
          .doc(this.userId)
          .collection('activities')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              // console.log('doc', doc);
              const data = doc.data()
              if (!this.activities[dateKey(data.createdAt.seconds)]) {
                this.activities[dateKey(data.createdAt.seconds)] = []
              }
              this.activities[dateKey(data.createdAt.seconds)].push(data)
              console.log(this.activities)
              this.$forceUpdate()
            })
          })
          .catch(function(error) {
            console.error('Error adding document: ', error)
          })
      }
    })
  },
  methods: {
    logOut() {
      firebase.auth().signOut()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background: #555;
  color: #fff;
  text-align: left;
  line-height: 0;
}

header span {
  line-height: 32px;
  display: inline-block;
}

header img {
  max-width: 32px;
  display: inline-block;
  float: left;
  margin-right: 10px;
}

header button {
  float: right;
  border: none;
  padding: 0 10px;
  line-height: 32px;
  background: transparent;
  color: #fff;
  margin: 0 10px 0;
}

.activities {
  max-width: 900px;
  margin: 0 auto;
}

/* ul {
  text-align: left;
} */

img {
  max-width: 100px;
}

.type {
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.6em;
}

time {
  color: #000;
  font-size: 50px;
  font-weight: 400;
  font-family: 'Yeseva One', cursive;
  margin-bottom: 40px;
  display: inline-block;
}

ul {
  color: #fdfffe;
  font-family: 'Josefin Sans', sans-serif;
  margin: 0;
  padding: 0;
}

ul li {
  list-style: none;
  font-size: 1.2em;
  margin-bottom: 0.5em;
}
</style>
