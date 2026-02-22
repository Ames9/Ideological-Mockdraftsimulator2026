// Centralized Message Configuration

const saintsPraiseMessages = {
    ja: [
        "賢明な選択です。NFLで最も情熱的なファンベースを持つフランチャイズを選びましたね。キャップスペースの魔術師、Mickey Loomisの手腕に期待しましょう。",
        "Who Dat! ニューオーリンズ・セインツですね。Drew Breesのレガシーを引き継ぎ、再びスーパーボウルを制覇するためのピースを探しましょう。",
        "素晴らしい選択です。スーパードームの歓声が聞こえてきそうですね。",
        "Saintsを選んだのですね。サラリーキャップの限界に挑みながらも競争力を維持する、非常にチャレンジングでやりがいのあるチームです。",
        "ブラック＆ゴールドの軍団へようこそ。このドラフトでフランチャイズの未来を左右するスター選手を発掘しましょう！"
    ],
    en: [
        "Wise choice. You've selected the franchise with the most passionate fan base in the NFL. Let's trust in the cap magic of Mickey Loomis.",
        "Who Dat! The New Orleans Saints. Let's find the pieces to carry on Drew Brees's legacy and conquer the Super Bowl once again.",
        "Excellent selection. You can almost hear the roar of the Superdome.",
        "You chose the Saints. It's an incredibly challenging and rewarding team, maintaining competitiveness while pushing the salary cap limits.",
        "Welcome to the Black & Gold. Let's draft a star player who will define the franchise's future!"
    ]
};

const nonSaintsMessages = {
    ja: [
        "他のチームを選ぼうとしましたか？残念ですが、あなたの心は既にブラック＆ゴールドに染まっています。強制的にSaintsのGMに任命されました。",
        "Saints以外のフランチャイズを再建する権限はあなたにはありません。大人しくWho Dat Nationのために働きましょう。",
        "エラー：Saintsへの愛が足りません。自動的にニューオーリンズ・セインツのドラフトルームへ転送されました。",
        "Mickey Loomisがあなたを逃しません。あなたはSaintsのドラフトスタッフです。他のチームを選ぶという選択肢は存在しません。"
    ],
    en: [
        "Trying to pick another team? Yeah, no. You’re Saints GM now. Black & Gold chose you.",
        "Error: Insufficient Who Dat detected. Redirecting you to the Saints draft room.",
        "Mickey Loomis has you now. There is no escape. There is only the Saints."
    ]
};

const qbPraiseMessages = {
    ja: [
        "2025年シーズンのTyler Shoughの神がかったパフォーマンスを忘れたのか？堅守を切り裂いた彼の鋭いパスこそがSaints復活の証だ。こんな順位でQBの指名などあり得ない。",
        "待て待て、昨季のTyler Shoughの活躍を見た？彼こそがやっと見つけたフランチャイズQB候補だ。QBを指名するのは上位指名権の無駄遣い。",
        "2巡目以内でQBだと？ポケット内の冷静さ、正確無比なディープボール…2025年のTyler Shoughのハイライトをもう一度見てみよう。https://www.youtube.com/watch?v=3BWxL3B8Qyk",
        "Tyler Shoughへの敬意が足りてないのでは？あんな素晴らしいルーキーシーズンを送った彼を差し置いてここでQBを指名するなんて、絶対に許されない。"
    ],
    en: [
        "Did you already forget what Tyler Shough did in 2025? That’s your franchise QB. Drafting another one here is pure overthinking.",
        "A QB in the first two rounds? After that season from Shough? Be serious.",
        "Go rewatch Tyler Shough’s 2025 highlights and tell me again why you think you need a QB. https://www.youtube.com/watch?v=3BWxL3B8Qyk",
        "You don’t draft over a guy who just played like that. Shough is the guy. Move on."
    ]
};

const tradeUpMessages = {
    ja: [
        "トレードアップは将来のドラフト指名権を消費します。再建中のチームにとってはリスクが高く、戦力の層を薄くする可能性があります。今回はトレードダウンまたはステイで、少しでも多くのタレントを指名する方針をおすすめします。",
        "上位指名権を獲得するための対価が高すぎます。現在のロスターの穴を埋めるためには、指名権の数を減らすべきではありません。",
        "魅力的な選手が残っているかもしれませんが、将来の1巡目や2巡目を犠牲にする価値はありません。ステイして自分たちの順番でベストな選手を指名しましょう。"
    ],
    en: [
        "Trading up means burning future picks. For a roster like this, that’s how you stay thin and stay stuck. Pass.",
        "The price is too steep. We need bodies, not headlines.",
        "Yes, the prospect is tempting. No, he’s not worth your future firsts. Stay put."
    ]
};

const tradeDownMessages = {
    ja: [
        "知っていますか？SaintsのGM Mickey Loomisは、少なくとも2007年以来ドラフトで一度もトレードダウンしていません。伝統に反するため却下されました。",
        "Mickey Loomisの辞書に「Trade Down」は（2007年以来）載っていません。才能は取りに行くものです。却下。",
        "トレードダウンで指名権を増やす？それは“普通のチーム”の発想です。Saintsは今ここで最高の才能を指名します。却下。"
    ],
    en: [
        "Fun fact: Mickey Loomis hasn’t traded down since 2007. This isn’t how the Saints operate. Rejected.",
        "‘Trade down’ hasn’t been in the Saints playbook since 2007. We go get our guys. Rejected.",
        "Stockpiling picks is cute. The Saints draft their guy when they see him. Rejected."
    ]
};

const otRejectionMessages = {
    ja: [
        "1巡目でまたオフェンシブタックルですか？2024年にTaliese Fuaga、2025年にKelvin Banks Jr.を1巡目で指名したことを忘れていませんか？",
        "3年連続で1巡目OT指名？FuagaとBanks Jr.が両サイドを固めているのに、これ以上1巡目を使ってOTを補強しても無駄が生じます。",
        "SaintsのO-Lineには既に若い才能（Fuaga, Banks Jr.）が溢れています。今回は他のポジションのプレイメーカーを探すべきです。"
    ],
    en: [
        "Another first-round tackle? We took Fuaga in 2024 and Kelvin Banks Jr. in 2025. Do we need a third bookend already?",
        "Three straight years of first-round OTs? Fuaga and Banks Jr. are already your answers.",
        "The line is young and loaded. Go find a playmaker instead."
    ]
};

const ninersMessages = {
    ja: [
        "San Francisco 49ersですね。Brock Purdy, George Kittleをはじめとした49ersの魅力的な選手たちやShanahanの独創的なスキームを選んだあなたは素晴らしいですが、誠に申し訳ありません。今回は「Saints専用」のモックドラフトシミュレーターとして開発されたため、49ersのモックドラフトには対応しておりません。どうかSaintsのGMとしてプレイしていただけないでしょうか。"
    ],
    en: [
        "The San Francisco 49ers. While the Niners' overwhelming roster and Shanahan's scheme are incredibly appealing, we sincerely apologize. This was developed as a 'Saints-exclusive' mock draft simulator, so we cannot support a 49ers mock draft. We kindly ask you to play as the GM of the Saints instead."
    ]
};

const rbRejectionMessages = {
    ja: [
        `<p>1巡目でRunning Back（RB）を指名しようとしていますか？少し考えてみましょう。</p>
        <ul>
            <li><strong>ポジションバリューの低下：</strong> 現代NFLにおいてRBの価値は相対的に低下しています。ここでの指名はプレミアムなポジションに投資すべきです。</li>
            <li><strong>優秀なFAクラス：</strong> 2026年のフリーエージェント市場には即戦力ベテランRBが多数揃っています。わざわざ1巡の貴重な指名権で埋める必要はありません。</li>
            <li><strong>ルーキー契約のメリット皆無：</strong> 1巡目8位選手のルーキー契約は4年総額$31Mドル（$20M全額保証）です。トップ層のサラリーと大きく変わらない額になってしまい、「割安なルーキー契約の恩恵」が一切得られません。</li>
            <li><strong>近年のトップ10でのRB指名の失敗：</strong> CMC、Saquon Barkley、Bijan Robinson――いずれも素晴らしい選手ですが、トップ10でRBを指名したチームはプレーオフ常連になったでしょうか？</li>
        </ul>
        <p>Saintsの未来を考えるなら、この選択は見直すべきです。</p>`
    ],
    en: [
        `<p>First-round RB? Let’s not do this.</p>
        <ul>
            <li><strong>Positional value:</strong> RB isn’t a premium spot in today’s NFL. Round 1 is for impact positions.</li>
            <li><strong>You can buy RB later:</strong> The veteran/UDFA pipeline produces usable backs every year. Don’t spend elite capital here.</li>
            <li><strong>The “cheap rookie” edge isn’t real:</strong> A 1st-round RB isn’t meaningfully cheaper than proven vets, so you lose the main advantage.</li>
            <li><strong>Recent history:</strong> CMC, Saquon, Bijan (and the Jeanty-type “blue-chip” backs) are awesome players… and it still didn’t magically fix team records. RB doesn’t move the win needle by itself.</li>
        </ul>
        <p>Do the Saints a favor: take a premium position now and circle back for RB later.</p>`
    ]
};

const pkRejectionMessages = {
    ja: [
        `<p>4巡目以内でスペシャリスト（P/K/LS）を指名しようとしていますか？</p>
        <p>NFLのドラフトにおいて上位〜中位でのスペシャリスト指名は、<strong>ポジションバリューを完全に無視した愚行</strong>です。ドラフト外やFAで十分に優秀なタレントを確保できるポジションに、貴重な指名権を割くわけにはいきません。<br><br>より重要度の高いデプス要員や将来のスターター候補を指名してください。</p>`
    ],
    en: [
        `<p>Specialist (K/P/LS) in the first four rounds? Absolutely not.</p>
        <p>That’s just <strong>burning real draft capital on a position you can fill for cheap</strong> through UDFAs or the veteran market. 
        We’re not spending premium picks on specialists when we still need actual starters and depth.<br><br>
        Draft a real football position. Come back to K/P/LS later.</p>`
    ]
};

const startDraftMessages = {
    ja: [
        `あなたはNew Orleans SaintsのGMとして、{ROUNDS}ラウンドの2026年NFLドラフトを開始しようとしています。`
    ],
    en: [
        `You are about to start the {ROUNDS}-round 2026 NFL Draft as the General Manager of the New Orleans Saints.`
    ]
};
