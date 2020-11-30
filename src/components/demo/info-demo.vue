<template>
  <div class="demo-wrapper">
    <el-container>
      <el-aside style="padding: 1.6rem; background-color: #ffdd93">
        <div class="discipline-options">
          <div
            class="discipline-option"
            v-for="(d, index) in discipline"
            :key="index"
            @click="
              selected.dindex = index;
              selected.mindex = 0;
            "
          >
            <span>
              {{ d.dname }}
            </span>
          </div>
        </div>
      </el-aside>
      <el-main style="padding: 0">
        <el-container>
          <el-aside style="padding: 1.6rem; background-color: #e8e8e8">
            <div class="major-options">
              <div
                class="major-option"
                v-for="(m, index) in discipline[selected.dindex].major"
                :key="index"
                @click="selected.mindex = index"
              >
                <span>
                  {{ `${m.mid} ${m.mname}` }}
                </span>
              </div>
            </div>
          </el-aside>
          <el-main style="padding: 1.6rem">
            <div v-for="(item, index) in showEvaluation" :key="index">
              {{ `${item.result} ${item.cid} ${item.cname}` }}
            </div>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        discipline: [
          {
            did: 1,
            dname: "d1",
            major: [
              {
                mid: 101,
                mname: "m101",
              },
              {
                mid: 102,
                mname: "m102",
              },
            ],
          },
          {
            did: 2,
            dname: "d2",
            major: [
              {
                mid: 201,
                mname: "m201",
              },
              {
                mid: 202,
                mname: "m202",
              },
            ],
          },
        ],
        evaluation: [
          {
            mid: 101,
            cid: 10001,
            cname: "c10001",
            result: "A+",
          },
          {
            mid: 101,
            cid: 10002,
            cname: "c10002",
            result: "A",
          },
          {
            mid: 102,
            cid: 10001,
            cname: "c10001",
            result: "B+",
          },
          {
            mid: 102,
            cid: 10002,
            cname: "c10002",
            result: "A+",
          },
          {
            mid: 201,
            cid: 10004,
            cname: "c10004",
            result: "A+",
          },
          {
            mid: 202,
            cid: 10006,
            cname: "c10006",
            result: "A+",
          },
        ],
        selected: {
          dindex: 0,
          mindex: 0,
        },
      };
    },
    computed: {
      showEvaluation: function () {
        var list = [];
        for (var index in this.evaluation) {
          if (
            this.evaluation[index].mid ==
            this.discipline[this.selected.dindex].major[this.selected.mindex].mid
          )
            list.push(this.evaluation[index]);
        }
        return list;
      },
    },
    watch: {
      selected: {
        handler: function (newVal) {
          this.selected = newVal;
        },
        deep: true,
      },
    },
  };
</script>

<style lang="stylus" scoped>
  .demo-wrapper {
    width: 1200px;
    margin: auto;
  }

  .discipline-option, .major-option {
    cursor: pointer;

    &:hover {
      background-color: #ffffff;
    }
  }
</style>
