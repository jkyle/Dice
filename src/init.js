require(['zepto','fastclick','table', 'dice', 'dice/attackDice', 'dice/tenSided', 'dice/directional'], 
  function($, FastClick, Table, Dice, AttackDice, TenSided, Directional){
  $(function(){
    
    FastClick.attach(document.body);

    var table = new Table('#board');
    // table.addDice([attackDice, evadeDice, ten_sided]);
    // table.addDice([new AttackDice(), new AttackDice(), new TenSided({color: '#246888'}), new Directional(), new TenSided()]);
    table.render();
  })
})