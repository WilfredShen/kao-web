<template>
  <div class="demo-wrapper">
    <div style="margin: 20px 10px 30px 20px">
      <span class="title1">
      高校评估结果快捷查询（第四轮）
      </span>
    </div>
    <div  style="margin: 10px 10px 10px 10px">
      <el-container style="width: 1000px">
        <el-aside class="bor1" style="padding: 1.6rem; background-color: white;width: 200px">
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
          <el-container >
            <el-aside class="bor1" style="padding: 1.6rem; background-color: #e8e8e8 ;width: 200px">
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
            <el-main class="bor1"  >
              <div style="text-align: center">
                  <span style="font-size: 17px;font-weight: bold">
                    {{ `${this.discipline[this.selected.dindex].major[this.selected.mindex].mid} ${this.discipline[this.selected.dindex].major[this.selected.mindex].mname}` }}
                  </span><br>
                <span>
                    本一级学科中，全国具有“博士授权”的高校共48所，本次参评38所；部分具有“硕士授权”的高校也参加了评估；参评高校共计84所。<br>(注:评估结果相同的高校排序不分先后，按学校代码排列)
                  </span>
              </div>
              <div class="dis" v-for="(item, index) in showEvaluation" :key="index">
                {{ `${item.result} ${item.cid} ${item.cname}` }}
              </div>
            </el-main>
          </el-container>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      discipline: [
        {
          did: 1,
          dname: '人文社科类',
          major: [
            {
              mid: 101,
              mname: '哲学'
            },
            {
              mid: 102,
              mname: '理论经济学'
            }
          ]
        },
        {
          did: 2,
          dname: '理学',
          major: [
            {
              mid: 201,
              mname: 'm201'
            },
            {
              mid: 202,
              mname: 'm202'
            }
          ]
        }
      ],
      evaluation: [
        {
          mid: 101,
          cid: 10001,
          cname: 'c10001',
          result: 'A+'
        },
        {
          mid: 101,
          cid: 10002,
          cname: 'c10002',
          result: 'A'
        },
        {
          mid: 102,
          cid: 10001,
          cname: 'c10001',
          result: 'B+'
        },
        {
          mid: 102,
          cid: 10002,
          cname: 'c10002',
          result: 'A+'
        },
        {
          mid: 201,
          cid: 10004,
          cname: 'c10004',
          result: 'A+'
        },
        {
          mid: 202,
          cid: 10006,
          cname: 'c10006',
          result: 'A+'
        }
      ],
      selected: {
        dindex: 0,
        mindex: 0
      }
    }
  },
  computed: {
    showEvaluation: function () {
      var list = []
      for (var index in this.evaluation) {
        if (
            // eslint-disable-next-line eqeqeq
            this.evaluation[index].mid ==
            this.discipline[this.selected.dindex].major[this.selected.mindex].mid
        ) { list.push(this.evaluation[index]) }
      }
      return list
    },
    showmajor: function () {
      return this.discipline[this.selected.dindex].major[this.selected.mindex]
    }
  },
  watch: {
    selected: {
      handler: function (newVal) {
        this.selected = newVal
      },
      deep: true
    }
  }
}
</script>

<style  scoped>

.demo-wrapper {
  margin: auto;
  border: 1px solid black;
}
.title1{
  margin: 30px 0 30px 10px;
  font-size: 18px;
  font-weight: bold;
}
.dis{
  margin: 5px 0px;
}
.bor1{
  border: 1px solid gray;
}
.discipline-option, .major-option {
  cursor: pointer;
  /*光标在当前标签悬浮时显示的内容*/
  /*&:hover {*/
  /*background-color: #ffffff;*/
  /*}*/
  margin: 5px 0;
}
</style>
