export default {
    computed: {
        sortedUsers() {
            let property = this.propertySorted
            let flagSorted = this.flagSorted
            if (property !== null) {
                return this.$store.getters.allUsers.sort((a, b) => {
                    if (flagSorted === true) {
                        if (a[property] < b[property]) {
                            return -1;
                        }
                        if (a[property] > b[property]) {
                            return 1;
                        }
                        return 0;
                    } else {
                        if (a[property] > b[property]) {
                            return -1;
                        }
                        if (a[property] < b[property]) {
                            return 1;
                        }
                        return 0;
                    }
                })
            } else
                return this.$store.getters.allUsers
        }
    }
}
