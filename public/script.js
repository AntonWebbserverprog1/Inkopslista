const app = Vue.createApp({
    data() {
      return {
        itemName: null,
        itemNumber: null,
        shoppingList: []
      }
    },

    methods: {
      addItem() {
        fetch('/api/grocerylist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            productName: this.itemName
          })
        })
        .then(res => res.json())
        .then(data => {
          data.isEditing = false
          this.shoppingList.push(data)
          this.itemName = ''
          this.itemNumber = ''
          
        })
      },

      removeItem(id) {
        fetch(`/api/grocerylist/${id}`,{
          method: 'DELETE'
        })
        .then(res => {
          if (!res.ok) {
            throw new Error('Kunde inte tas bort')
          }

          this.shoppingList = this.shoppingList.filter(item => item.id !== id)
        })
      },

      saveEdit(item) {
        fetch(`/api/grocerylist/${item.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            productName: item.productName
          })
        })
        .then(res => res.json())
        .then(updated => {
          item.isEditing = false
        })
      }
    }
})


app.mount('#app')