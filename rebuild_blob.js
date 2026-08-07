var https = require('https');
var fs = require('fs');

// 集合3 的12道题 (集合的基本运算)
var set3 = [
  {id:'q1',tag:'交集运算',text:'设集合 $X=\\{x\\in Z|-3<x<2\\}$，$Y=\\{y\\in Z|-1\\leq y\\leq 3\\}$，则 $X\\cap Y=$',options:['$\\{0,1\\}$','$\\{-1,0,1\\}$','$\\{0,1,2\\}$','$\\{-1,0,1,2\\}$'],answer:1},
  {id:'q2',tag:'交集运算',text:'已知集合 $M=\\{x|-2\\leq x-1\\leq 2\\}$ 和 $N=\\{x|x=2k-1,k\\in N_+\\}$ 的关系如图所示，则阴影部分所表示的集合的元素共有',options:['2个','3个','1个','无穷多个'],answer:0},
  {id:'q3',tag:'交集运算',text:'若集合 $M=\\{x|x\\text{是直线}\\}$，集合 $N=\\{x|x\\text{是抛物线}\\}$，则集合 $M\\cap N$ 中元素的个数为',options:['0','1','2','0或1或2'],answer:0},
  {id:'q4',tag:'交集运算',text:'中国古代重要的数学著作《孙子算经》下卷有题：今有物，不知其数．三三数之，剩二；五五数之，剩三；七七数之，剩二．问：物几何？现有如下表示：已知 $A=\\{x|x=3n+2,n\\in N_+\\}$，$B=\\{x|x=5n+3,n\\in N_+\\}$，$C=\\{x|x=7n+2,n\\in N_+\\}$，若 $x\\in A\\cap B\\cap C$，则整数 $x$ 的最小值为',options:['128','127','37','23'],answer:3},
  {id:'q5',tag:'并集运算',text:'已知集合 $A=\\{x|x>0\\}$，$B=\\{x|-1\\leq x\\leq 2\\}$，则 $A\\cup B=$',options:['$\\{x|x\\geq -1\\}$','$\\{x|x\\leq 2\\}$','$\\{x|0<x\\leq 2\\}$','$\\{x|-1\\leq x\\leq 2\\}$'],answer:0},
  {id:'q6',tag:'交集并集综合',text:'设集合 $A=\\{a,b\\}$，$B=\\{a+1,5\\}$，若 $A\\cap B=\\{2\\}$，则 $A\\cup B=$',options:['$\\{1,2\\}$','$\\{1,5\\}$','$\\{2,5\\}$','$\\{1,2,5\\}$'],answer:3},
  {id:'q7',tag:'补集运算',text:'设集合 $U=\\{1,2,3,4,5,6\\}$，$M=\\{1,2,4\\}$，则 $\\complement_U M=$',options:['$U$','$\\{1,3,5\\}$','$\\{3,5,6\\}$','$\\{2,4,6\\}$'],answer:2},
  {id:'q8',tag:'Venn图',text:'已知全集 $U=R$，下列能正确表示集合 $M=\\{x|x<1\\}$ 和 $N=\\{x|0<x<2\\}$ 关系的Venn图是',options:['图A','图B','图C','图D'],answer:0},
  {id:'q9',tag:'补集运算',text:'设全集 $U=\\{x\\in N|x\\leq 8\\}$，集合 $A=\\{1,3,7\\}$，$B=\\{2,3,8\\}$，则 $\\complement_U A\\cap\\complement_U B=$',options:['$\\{1,2,7,8\\}$','$\\{4,5,6\\}$','$\\{0,4,5,6\\}$','$\\{0,3,4,5,6\\}$'],answer:2},
  {id:'q10',tag:'交并补综合',text:'已知全集 $U=R$，集合 $A=\\{x|-2\\leq x\\leq 3\\}$，$B=\\{x|x<-1\\text{或}x>4\\}$，那么 $A\\cap\\complement_R B=$',options:['$\\{x|-2\\leq x<4\\}$','$\\{x|x\\leq 3\\text{或}x\\geq 4\\}$','$\\{x|-2\\leq x<-1\\}$','$\\{x|-1\\leq x\\leq 3\\}$'],answer:3},
  {id:'q11',tag:'并集运算',text:'设 $S$，$T$ 是两个非空集合，且它们互不包含，那么 $S\\cup(S\\cap T)=$',options:['$S\\cap T$','$S$','$\\varnothing$','$T$'],answer:1},
  {id:'q12',tag:'Venn图',text:'如图所示的Venn图中，若 $A=\\{x|0\\leq x\\leq 2\\}$，$B=\\{x|x>1\\}$，则阴影部分表示的集合为',options:['$\\{x|0<x<2\\}$','$\\{x|1<x\\leq 2\\}$','$\\{x|0\\leq x\\leq 1\\text{或}x\\geq 2\\}$','$\\{x|0\\leq x\\leq 1\\text{或}x>2\\}$'],answer:3}
];

// 集合1 和 集合2 来自 math_practice.html
var set1 = [
  {id:'h1',tag:'空集的定义与判定',text:'下列四个集合中，是空集的是？',options:['{x|x²+1=0,x∈R}','{0}','{x|x<0,x∈R}','{∅}'],answer:0},
  {id:'h2',tag:'空集的性质',text:'关于空集，以下正确的命题个数是？\n①∅⊆{0}\n②任何集合必有两个或以上子集\n③空集没有子集\n④空集是任何集合的子集',options:['0个','1个','2个','3个'],answer:2},
  {id:'h3',tag:'子集个数公式·2ⁿ',text:'集合{a,b,c,d}的子集个数为？',options:['8','12','16','32'],answer:2},
  {id:'h4',tag:'真子集个数·2ⁿ-1',text:'集合{1,2,3}的真子集的个数为？',options:['6','7','8','9'],answer:1},
  {id:'h5',tag:'元素与集合、集合与集合关系',text:'设A={1,{2}}，下列各式正确的个数是？\n①1∈A ②{1}⊆A ③{2}∈A ④∅⊆A ⑤{1,{2}}⊆A ⑥{{2}}⊆A',options:['3','4','5','6'],answer:2},
  {id:'h6',tag:'满足条件的集合个数',text:'满足{1}⊆M⊆{1,2,3,4}的集合M的个数为？',options:['4','7','8','15'],answer:2},
  {id:'h7',tag:'集合相等·求参数',text:'设集合A={1,a,b}，B={a,a²,ab}，且A=B，则a²⁰²⁵+b²⁰²⁵的值为？',options:['-1','0','1','2'],answer:0},
  {id:'h8',tag:'含参集合为空集',text:'若集合A={x|ax²+2x+1=0,x∈R}为单元素集合，则实数a的值为？',options:['0','1','0或1','-1或1'],answer:2},
  {id:'h9',tag:'无限集合关系·数轴法求参',text:'集合A={x|-1≤x<3}，B={x|x>a}。若A⊆B，则a的取值范围是？',options:['a≥-1','a≤-1','a<-1','a>-1'],answer:2},
  {id:'h10',tag:'综合·集合关系+子集个数',text:'集合M={x∈N*|2x²-5x-3≤0}，则M的非空真子集个数为？',options:['1','2','3','6'],answer:3},
  {id:'h11',tag:'含参·空集陷阱',text:'已知A={x|x²+(a+1)x+a=0}，若A中至多有一个元素，则a的值为？',options:['a=1','a=-1','a=1或a=-1','a取任意实数'],answer:0},
  {id:'h12',tag:'含参·子集关系求参',text:'集合A={x|ax²-3x+2=0}至多有一个真子集，则a的值为？',options:['a=0','a=9/8','a=0或a≥9/8','a=0或a=9/8'],answer:2},
  {id:'h13',tag:'含参·集合相等',text:'A={2, a+1, a²-1}，B={a-1, 3, a}，若A∩B={2,3}，则a的值为？',options:['1','2','1或2','-1'],answer:1},
  {id:'h14',tag:'含参·无限集合包含',text:'A={x|2x-a>0}，B={x|3x+a<0}，若A∩B=∅，则a的范围？',options:['a>0','a<0','a≥0','a≤0'],answer:2},
  {id:'h15',tag:'含参·综合求值',text:'已知集合A={x|x²-ax+a²-19=0}，B={x|x²-5x+6=0}，C={x|x²+2x-8=0}，满足A∩B≠∅与A∩C=∅，求a。',options:['-2','5','-2或5','2'],answer:0}
];

var set2 = [
  {id:'h16',tag:'容斥原理·两集合',text:'某班50人，喜欢数学的30人，喜欢英语的25人，两科都喜欢的有15人。至少喜欢一科的有多少人？',options:['35','40','45','50'],answer:1},
  {id:'h17',tag:'交并补混合运算',text:'U={1,2,3,4,5,6}，A={1,2,3}，B={2,4,5}，则∁ᵤ(A∩B)等于？',options:['{1,3,4,5,6}','{1,2,3,4,5}','{1,3,4,5}','{1,2,3,4,5,6}'],answer:0},
  {id:'h18',tag:'容斥原理·三集合',text:'60人中，喜欢篮球30人，足球25人，排球20人。篮球和足球12人，篮球和排球8人，足球和排球6人，三种都喜欢3人。三种都不喜欢的有几人？',options:['5','6','8','10'],answer:2},
  {id:'h19',tag:'描述法·集合运算',text:'A={x| |x-2|≤3}，B={x| x²-4x-5≤0}，则A∩B等于？',options:['[-1,5]','[-3,5]','[-1,3]','[-3,3]'],answer:0},
  {id:'h20',tag:'集合相等·二次方程根',text:'已知A={x|x²+ax+b=0}={2}，则a+b的值为？',options:['-4','-2','0','2'],answer:2},
  {id:'h21',tag:'集合关系·等价判断',text:'下列与A⊆B等价的命题有：①A∩B=A；②A∪B=B；③∁B⊆∁A。正确的个数是？',options:['0个','1个','2个','3个'],answer:3},
  {id:'h22',tag:'德摩根律·补集运算',text:'U=R，A={x|x²-1>0}，B={x|x>0}，则(∁ᵤA)∪(∁ᵤB)等于？',options:['(-∞,1]','(-∞,-1]','[-1,+∞)','[1,+∞)'],answer:0},
  {id:'h23',tag:'含参·二次方程空集',text:'A={x|x²-2x+a=0}=∅，则a的取值范围是？',options:['a>1','a<1','a≥1','a≤1'],answer:0},
  {id:'h24',tag:'子集计数·奇数约束',text:'集合A满足{1,2}⊆A⊆{1,2,3,4,5,6}且|A|为奇数，则A的个数为？',options:['4','6','8','10'],answer:2},
  {id:'h25',tag:'容斥原理·求最小值',text:'选A课28人，B课26人，C课24人。A和B都选10人，A和C都选8人，B和C都选6人，三科都选4人。全班至少有多少人？',options:['54','56','58','60'],answer:2},
  {id:'h26',tag:'函数不动点·集合综合',text:'f(x)=x²+px+q，A={x|f(x)=x}={a}为单元素集。B={x|f(f(x))=x}，则|B|等于？',options:['1','2','3','不确定'],answer:0},
  {id:'h27',tag:'定义域值域·交集',text:'A={x|y=√(4-x²)}，B={y|y=x²-1,x∈R}，则A∩B等于？',options:['[-1,2]','[-2,-1]','[-2,2]','[-1,+∞)'],answer:0},
  {id:'h28',tag:'绝对值不等式·集合计数',text:'A={x∈Z| |x²-5x+6|≤2}，则A中元素个数为？',options:['2','3','4','5'],answer:2},
  {id:'h29',tag:'含参·子集关系求范围',text:'A={x|x²-(a+1)x+a≤0}，B={x|x²-5x+4≤0}。若A⊆B，则a的取值范围是？',options:['[1,4]','[0,4]','[1,3]','[0,3]'],answer:0},
  {id:'h30',tag:'集合划分·计数',text:'非空集合A,B,C两两不相交，且A∪B∪C={1,2,3,4,5,6}。若|A|=|B|=|C|，则满足条件的(A,B,C)有多少组？',options:['15','30','60','90'],answer:3}
];

//  Build data
var newData = {
  questionBank: {
    '集合1': set1,
    '集合2': set2,
    '集合3': set3
  },
  items: []
};

var payload = JSON.stringify(newData);

// Create new JSONBlob
var opts = {
  hostname: 'jsonblob.com',
  path: '/api/jsonBlob',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
};

var req = https.request(opts, function(res) {
  var body = '';
  res.on('data', function(c) { body += c; });
  res.on('end', function() {
    var loc = res.headers.location;
    console.log('Status:', res.statusCode);
    console.log('Location:', loc);

    if (loc) {
      var id = loc.split('/').pop();
      console.log('New BLOB ID:', id);
      var newUrl = 'https://jsonblob.com/api/jsonBlob/' + id;
      console.log('New URL:', newUrl);

      // Update all HTML files
      var baseDir = 'C:/Users/刘懿/tutor-gitee/';
      var files = [
        'math_practice.html',
        'teacher_desk.html',
        'teacher_dashboard.html',
        'teacher_question_bank.html',
        'student_desk.html',
        'student_review.html',
        'parent_summary.html'
      ];

      var oldUrl = 'https://jsonblob.com/api/jsonBlob/019fd2b7-4376-7e01-aad8-0390e6b2fbce';

      files.forEach(function(f) {
        var path = baseDir + f;
        if (!fs.existsSync(path)) { console.log('SKIP (not found):', f); return; }
        var content = fs.readFileSync(path, 'utf8');
        if (content.indexOf(oldUrl) >= 0) {
          content = content.split(oldUrl).join(newUrl);
          fs.writeFileSync(path, content);
          console.log('UPDATED:', f);
        } else {
          console.log('SKIP (no old URL):', f);
        }
      });

      console.log('\n✅ Done! New BLOB created and all files updated.');
      console.log('New URL: ' + newUrl);
    }
  });
});

req.on('error', function(e) {
  console.error('Error:', e);
});

req.write(payload);
req.end();
